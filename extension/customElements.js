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

  const postRegistered = (ytElmTag, f) => {
    const ceElmConstrcutor = customElements.get(ytElmTag);
    const proto = (ceElmConstrcutor || 0).prototype || 0;
    if (proto && "__hasRegisterFinished" in proto) {
      f(proto);
    } else if (proto && "_registered" in proto) {
      postRegistered_(proto).push(f);
    } else {
      console.warn("[tyt] postRegistered is not supported.");
    }
  };

  const injectorCreationForRegistered = (mMapOfFuncs, _registered) => {
    if (!(mMapOfFuncs instanceof WeakMap) || typeof _registered !== "function")
      return console.error("[ytI] Incorrect parameters");
    const $callee = function (...args) {
      const map = mMapOfFuncs;
      const f = _registered;
      if (!f) return console.error("[ytI] the injector is already destroyed.");
      // CE prototype have not yet been "Object.defineProperties()"
      let res = f.call(this, ...args); // normally shall be undefined with no arguments
      // CE prototype have been "Object.defineProperties()"
      let funcs = null;
      try {
        const constructor = this.constructor || null;
        if (!constructor || !constructor.prototype)
          throw "[ytI] CE constructor is not found or invalid.";
        // constructor.prototype._registered = f; // restore to original
        delete constructor.prototype._registered;
        if (constructor.prototype._registered !== f) {
          constructor.prototype._registered = f;
        }
        funcs = map.get(constructor) || 0;
        if (typeof funcs.length !== "number")
          throw "[ytI] This injection function call is invalid.";
        console.debug(
          `[ytI] ${constructor.prototype.is}'s _registered have been called.`
        );
        map.set(constructor, null); // invalidate
        for (const func of funcs) {
          func(constructor.prototype); // developers might implement Promise, setTimeout, or requestAnimation inside the `func`.
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (funcs) funcs.length = 0;
      }
      return res;
    };
    $callee.getMap = () => mMapOfFuncs; // for external
    $callee.getOriginalFunction = () => _registered; // for external
    $callee.destroyObject = function () {
      // in addition to GC
      mMapOfFuncs = null; // WeakMap does not require clear()
      _registered = null;
      this.__injector__ = null;
      this.getMap = null;
      this.getOriginalFunction = null;
      this.destroyObject = null;
    };
    // after all injected _registered are called,
    // customElements.get('ytd-watch-flexy').prototype._registered.__injector__.deref() will become undefined.
    const wrapped =
      typeof WeakRef === "function" ? new WeakRef($callee) : $callee;
    $callee.__injector__ = wrapped; // for _registered.__injector__
    return $callee;
  };

  const customYtElements = {
    whenRegistere/*

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
      'use strict';
    
      const postRegistered = (ytElmTag, f) => {
        const ceElmConstrcutor = customElements.get(ytElmTag);
        const proto = ((ceElmConstrcutor || 0).prototype || 0);
        if (proto && ('__hasRegisterFinished' in proto)) {
          f(proto);
        } else if (proto && ('_registered' in proto)) {
          postRegistered_(proto).push(f);
        } else {
          console.warn('[tyt] postRegistered is not supported.');
        }
      }
    
      const injectorCreationForRegistered = ((mMapOfFuncs, _registered) => {
        if (!(mMapOfFuncs instanceof WeakMap) || (typeof _registered !== 'function')) return console.error('[ytI] Incorrect parameters');
        const $callee = function (...args) {
          const map = mMapOfFuncs;
          const f = _registered;
          if (!f) return console.error('[ytI] the injector is already destroyed.');
          // CE prototype have not yet been "Object.defineProperties()"
          let res = f.call(this, ...args); // normally shall be undefined with no arguments
          // CE prototype have been "Object.defineProperties()"
          let funcs = null;
          try {
            const constructor = this.constructor || null;
            if (!constructor || !constructor.prototype) throw '[ytI] CE constructor is not found or invalid.';
            // constructor.prototype._registered = f; // restore to original
            delete constructor.prototype._registered;
            if (constructor.prototype._registered !== f) {
              constructor.prototype._registered = f;
            }
            funcs = map.get(constructor) || 0;
            if (typeof funcs.length !== 'number') throw '[ytI] This injection function call is invalid.';
            console.debug(`[ytI] ${constructor.prototype.is}'s _registered have been called.`);
            map.set(constructor, null); // invalidate
            for (const func of funcs) {
              func(constructor.prototype); // developers might implement Promise, setTimeout, or requestAnimation inside the `func`.
            }
          } catch (e) {
            console.warn(e);
          } finally {
            if (funcs) funcs.length = 0;
          }
          return res;
        }
        $callee.getMap = () => mMapOfFuncs; // for external
        $callee.getOriginalFunction = () => _registered; // for external
        $callee.destroyObject = function () {
          // in addition to GC
          mMapOfFuncs = null; // WeakMap does not require clear()
          _registered = null;
          this.__injector__ = null;
          this.getMap = null;
          this.getOriginalFunction = null;
          this.destroyObject = null;
        }
        // after all injected _registered are called,
        // customElements.get('ytd-watch-flexy').prototype._registered.__injector__.deref() will become undefined.
        const wrapped = typeof WeakRef === 'function' ? new WeakRef($callee) : $callee;
        $callee.__injector__ = wrapped; // for _registered.__injector__
        return $callee;
      });
    
      const customYtElements = {
        whenRegistered(ytElmTag, immediateCallback) {
          return new Promise(resolve => {
            if (typeof customElements !== 'object' || typeof customElements.whenDefined !== 'function' || typeof customElements.get !== 'function') console.error('[ytI] customElements (native or polyfill) is not available.');
            const ceReady = () => { // ignore async result; the result in whenDefined is not the same as customElements.get
              postRegistered(ytElmTag, (proto) => {
                if (immediateCallback) immediateCallback(proto);
                resolve(proto);
              });
            }
            customElements.get(ytElmTag) ? ceReady() : customElements.whenDefined(ytElmTag).then(ceReady);
          });
        }
      }
    
      const postRegistered_ = (ceProto) => { // delay prototype injection
        if (!('_registered' in ceProto)) return console.warn('[ytI] no _registered is found in proto');
        const _registered = ceProto._registered; // make a copy in this nested closure.
        if (typeof _registered !== 'function') return console.warn('[ytI] proto._registered is not a function');
        let injector = null;
        if (injector = _registered.__injector__) {
          if (injector.deref) injector = injector.deref(); // null if _registered of all CEs are restored.
        }
        if (!injector) {
          injector = injectorCreationForRegistered(new WeakMap(), _registered);
          _registered.__injector__ = injector.__injector__;
        }
        if (typeof (injector || 0).getMap !== 'function') return console.warn('[ytI] the injector function is invalid.');
        const mapOfFuncs = injector.getMap();
        const ceConstructor = ceProto.constructor || null;
        if (!ceConstructor) return console.warn('[ytI] no constructor is found in proto');
        let funcs;
        if (!mapOfFuncs.has(ceConstructor)) {
          mapOfFuncs.set(ceConstructor, funcs = []);
          ceProto._registered = injector;
        } else {
          funcs = mapOfFuncs.get(ceConstructor);
        }
        if (!funcs) return console.warn('[ytI] _registered has already called. You can just override the properties.');
        return funcs;
      }
     
      // Export to external environment
      try { window.customYtElements = customYtElements; } catch (error) { /* for Greasemonkey */ }
      try { module.customYtElements = customYtElements; } catch (error) { /* for CommonJS */ }
     
      return customYtElements;
    
    })();d(ytElmTag, immediateCallback) {
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
  };

  const postRegistered_ = (ceProto) => {
    // delay prototype injection
    if (!("_registered" in ceProto))
      return console.warn("[ytI] no _registered is found in proto");
    const _registered = ceProto._registered; // make a copy in this nested closure.
    if (typeof _registered !== "function")
      return console.warn("[ytI] proto._registered is not a function");
    let injector = null;
    if ((injector = _registered.__injector__)) {
      if (injector.deref) injector = injector.deref(); // null if _registered of all CEs are restored.
    }
    if (!injector) {
      injector = injectorCreationForRegistered(new WeakMap(), _registered);
      _registered.__injector__ = injector.__injector__;
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
      ceProto._registered = injector;
    } else {
      funcs = mapOfFuncs.get(ceConstructor);
    }
    if (!funcs)
      return console.warn(
        "[ytI] _registered has already called. You can just override the properties."
      );
    return funcs;
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
