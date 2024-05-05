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

var ytZara = (function () {
  "use strict";
  const VERSION_CONTROL = 1;
  const _global_ytZara = window.ytZara;
  if (_global_ytZara) {
    if (_global_ytZara.VERSION_CONTROL === VERSION_CONTROL) {
      return _global_ytZara;
    } else if (_global_ytZara.VERSION_CONTROL > VERSION_CONTROL) {
      console.warn("A newer ytZara is used.");
      return _global_ytZara;
    } else {
      console.warn("A newer ytZara will replace your outdated ytZara.");
      delete window.ytZara;
    }
  }
  const insp = (o) => (o ? o.polymerController || o.inst || o || 0 : o || 0);
  const indr = (o) => insp(o).$ || o.$ || 0;
  const ytZara = {
    VERSION_CONTROL,
    insp,
    indr,
    async ytProtoAsync(tag) {
      await this.promiseRegistryReady().then();
      await customElements.whenDefined(tag).then();
      return insp(document.createElement(tag)).constructor.prototype;
    },
    docInitializedAsync() {
      return new Promise((resolve) => {
        let mo = new MutationObserver(() => {
          mo.disconnect();
          mo.takeRecords();
          mo = null;
          resolve();
        });
        mo.observe(document, { childList: true, subtree: true });
      });
    },
    isYtHidden(elem) {
      if (!(elem instanceof Element)) return null;
      return HTMLElement.prototype.closest.call(elem, "[hidden]");
    },
    _promiseRegistryReady: null,
    promiseRegistryReady() {
      return (
        this._promiseRegistryReady ||
        (this._promiseRegistryReady = new Promise(this.onRegistryReady))
      );
    },
    onRegistryReady(callback) {
      const EVENT_KEY_ON_REGISTRY_READY = "ytI-ce-registry-created";
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
          document.removeEventListener(
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
  try {
    window.ytZara = ytZara;
  } catch (error) {}
  return ytZara;
})();
