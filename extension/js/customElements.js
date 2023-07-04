/*

MIT License

Copyright (c) 2023 cyfung1031

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const customYtElements = (function () {
  "use strict";

  const injectorCreationForRegistered = (fnHandler) => {
    let mMapOfFuncs = new WeakMap();
    if (!(mMapOfFuncs instanceof WeakMap) || typeof fnHandler !== "function")
      return console.error("[ytI] Incorrect parameters");
    const $callee = function (...args) {
      const f = fnHandler;
      if (!f) return console.error("[ytI] the injector is already destroyed.");

      const isControllerExtraction =
        typeof this.forwardMethods === "function" &&
        typeof this._registered === "undefined";
      const isComponentRegister =
        typeof this._registered === "function" &&
        typeof this.forwardMethods === "undefined";
      let warning = "";
      if (isControllerExtraction) {
        if (typeof this.inst !== "object") {
          warning +=
            "[ytI] Controller Extraction is enabled but the corresponding instance is not found.\n";
        }
      } else if (isComponentRegister) {
        //
      } else {
        warning += "[ytI] customYtElement's definition is undefined.\n";
      }
      const fnTag = f.__ytHandlerFuncName__;
      if (isControllerExtraction && fnTag !== "forwardMethods") {
        warning +=
          "[ytI] Unknown Error in injectorCreationForRegistered. (0x3F01)\n";
      }
      if (isComponentRegister && fnTag !== "_registered") {
        warning +=
          "[ytI] Unknown Error in injectorCreationForRegistered. (0x3F02)\n";
      }
      const map = mMapOfFuncs;
      // CE prototype has not yet been "Object.defineProperties()"
      const res = f.call(this, ...args); // normally shall be undefined with no arguments
      // CE prototype has been "Object.defineProperties()"
      let funcs = null;
      try {
        if (warning) throw warning.trim();
        const constructor = this.constructor || null;
        if (!constructor || !constructor.prototype)
          throw "[ytI] CE constructor is not found or invalid.";
        // constructor.prototype.${fnTag} = f; // restore to original
        delete constructor.prototype[fnTag];
        if (constructor.prototype[fnTag] !== f) {
          constructor.prototype[fnTag] = f;
        }
        funcs = map.get(constructor) || 0;
        if (typeof funcs.length !== "number")
          throw "[ytI] This injection function call is invalid.";
        console.debug(
          `[ytI] ${constructor.prototype.is}'s ${fnTag} has been called.`
        );
        map.set(constructor, null); // invalidate
        const proto = isControllerExtraction
          ? this.inst.constructor.prototype
          : constructor.prototype;
        for (const func of funcs) {
          func(proto); // developers might implement Promise, setTimeout, or requestAnimation inside the `func`.
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (funcs) funcs.length = 0;
      }
      return res;
    };
    $callee.__ytHandlerFuncName__ = fnHandler.__ytHandlerFuncName__;
    $callee.getMap = () => mMapOfFuncs; // for external
    $callee.getOriginalFunction = () => fnHandler; // for external
    $callee.destroyObject = function () {
      // in addition to GC
      mMapOfFuncs = null; // WeakMap does not require clear()
      fnHandler = null;
      this.__injector__ = null;
      this.getMap = null;
      this.getOriginalFunction = null;
      this.destroyObject = null;
    };
    // after all injected ${fnHandler} are called,
    // customElements.get('ytd-watch-flexy').prototype.${fnHandler}.__injector__.deref() will become undefined.
    const wrapped =
      typeof WeakRef === "function" ? new WeakRef($callee) : $callee;
    $callee.__injector__ = wrapped; // for ${fnHandler}.__injector__
    return $callee;
  };

  const injectionPool = (ceProto, fnTag, actionFn) => {
    // delay prototype injection
    if (!(fnTag in ceProto))
      return console.warn(`[ytI] no ${fnTag} is found in proto`);
    const fnHandler = ceProto[fnTag]; // make a copy in this nested closure.
    if (typeof fnHandler !== "function")
      return console.warn(`[ytI] proto.${fnTag} is not a function`);
    let injector = null;
    if ((injector = fnHandler.__injector__)) {
      if (injector.deref) injector = injector.deref(); // null if ${fnTag} of all CEs are restored.
    }
    if (
      typeof fnHandler.__ytHandlerFuncName__ === "string" &&
      fnHandler.__ytHandlerFuncName__ !== fnTag
    ) {
      return console.warn(
        `[ytI] Injection Function Tag Mismatched: ${fnHandler.__ytHandlerFuncName__} & ${fnTag}`
      );
    }
    if (!injector) {
      fnHandler.__ytHandlerFuncName__ = fnTag;
      injector = injectorCreationForRegistered(fnHandler);
      // injector.__ytHandlerFuncName__ = fnTag;
      fnHandler.__injector__ = injector.__injector__;
    } else if (
      typeof injector.__ytHandlerFuncName__ === "string" &&
      injector.__ytHandlerFuncName__ !== fnTag
    ) {
      return console.warn(
        `[ytI] Injected Function Tag Mismatched: ${injector.__ytHandlerFuncName__} & ${fnTag}`
      );
    }
    if (typeof (injector || 0).getMap !== "function")
      return console.warn("[ytI] the injector function is invalid.");
    const mapOfFuncs = injector.getMap();
    const ceConstructor = ceProto.constructor || null;
    if (!ceConstructor)
      return console.warn("[ytI] no constructor is found in proto");
    let funcs;
    if (!mapOfFuncs.has(ceConstructor)) {
      mapOfFuncs.set(ceConstructor, (funcs = []));
      ceProto[fnTag] = injector;
    } else {
      funcs = mapOfFuncs.get(ceConstructor);
    }
    if (!funcs)
      return console.warn(
        `[ytI] ${fnTag} has already called. You can just override the properties.`
      );
    funcs.push(actionFn);
  };

  const postRegistered = (ytElmTag, f) => {
    const ceElmConstrcutor = customElements.get(ytElmTag);
    const proto = (ceElmConstrcutor || 0).prototype || 0;
    if (proto && "forwardMethods" in proto && !("_registered" in proto)) {
      // under controller extraction, the register mechanism is different
      // register is not done in first initialization
      const createdElement = document.querySelector(ytElmTag);
      const inst = (createdElement || 0).inst;
      if (inst) {
        f(inst.constructor.prototype);
      } else {
        injectionPool(proto, "forwardMethods", f);
      }
    } else if (proto && "__hasRegisterFinished" in proto) {
      f(proto);
    } else if (
      proto &&
      "_registered" in proto &&
      !("forwardMethods" in proto)
    ) {
      injectionPool(proto, "_registered", f);
    } else {
      console.warn("[ytI] postRegistered is not supported.");
    }
  };

  const EVENT_KEY_ON_REGISTRY_READY = "ytI-ce-registry-created";

  const customYtElements = {
    whenRegistered(ytElmTag, immediateCallback) {
      return new Promise((resolve) => {
        if (
          typeof customElements !== "object" ||
          typeof customElements.whenDefined !== "function" ||
          typeof customElements.get !== "function"
        )
          console.error(
            "[ytI] customElements (native or polyfill) is not available."
          );
        const ceReady = () => {
          // ignore async result; the result in whenDefined is not the same as customElements.get
          postRegistered(ytElmTag, (proto) => {
            if (immediateCallback) immediateCallback(proto);
            resolve(proto);
          });
        };
        customElements.get(ytElmTag)
          ? ceReady()
          : customElements.whenDefined(ytElmTag).then(ceReady);
      });
    },
    onRegistryReady(callback) {
      if (typeof customElements === "undefined") {
        if (!("__CE_registry" in document)) {
          // https://github.com/webcomponents/polyfills/
          Object.defineProperty(document, "__CE_registry", {
            get() {
              // return undefined
            },
            set(nv) {
              if (typeof nv == "object") {
                delete this.__CE_registry;
                this.__CE_registry = nv;
                this.dispatchEvent(
                  new CustomEvent(EVENT_KEY_ON_REGISTRY_READY)
                );
              }
              return true;
            },
            enumerable: false,
            configurable: true,
          });
        }
        let eventHandler = (evt) => {
          this.removeEventListener(
            EVENT_KEY_ON_REGISTRY_READY,
            eventHandler,
            false
          );
          const f = callback;
          callback = null;
          eventHandler = null;
          f();
        };
        document.addEventListener(
          EVENT_KEY_ON_REGISTRY_READY,
          eventHandler,
          false
        );
      } else {
        callback();
      }
    },
  };

  // Export to external environment
  try {
    window.customYtElements = customYtElements;
  } catch (error) {
    /* for Greasemonkey */
  }
  try {
    module.customYtElements = customYtElements;
  } catch (error) {
    /* for CommonJS */
  }

  return customYtElements;
})();
