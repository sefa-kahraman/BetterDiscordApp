/**
 * BetterDiscord Client WebpackModules Module
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

class WebpackModules {

    static async getModuleByProps(props) {
        const modules = await this.getAllModules();
        return new Promise((resolve, reject) => {
            const rm = [];
            for (let index in modules) {
                if (!modules.hasOwnProperty(index)) continue;
                const module = modules[index];
                const { exports } = module;

                if (!exports || typeof exports !== 'object') continue;
                if (!(props in exports)) continue;
                rm.push(module);
               // resolve(module);
               // break;
            }
            resolve(rm);
            reject(null);
        });
    }

    /*This will most likely not work for most modules*/
    static async getModuleByName(name) {
        const modules = await this.getAllModules();
        return new Promise((resolve, reject) => {
            for (let index in modules) {
                if (!modules.hasOwnProperty(index)) continue;
                const module = modules[index];
                const { exports } = module;
                if (!exports) continue;

                if (typeof exports === 'object' && (name in exports || exports.name === name)) {
                    resolve(module.exports);
                    break;
                } else if (typeof exports === 'function' && exports.name === name) {
                    resolve(module.exports);
                    break;
                }
            }

            reject(null);
        });
    }

    static async getAllModules() {
        return new Promise(resolve => {
            const id = 'bd-webpackmodules';
            window['webpackJsonp'](
                [],
                {
                    [id]: (module, exports, __webpack_require__) => {
                        delete __webpack_require__.c[id];
                        delete __webpack_require__.m[id];
                        resolve(__webpack_require__.c);
                    }
                },
                [id]
            );
        });
    }

}

module.exports = { WebpackModules };