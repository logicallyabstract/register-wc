/**
 * Copyright (c) 2020-present, Logically Abstract, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const regex = /^.*name\s"([a-z]+-[a-z]+)".*$/;

const noop = () => {};

/**
 * Create the registrar for custom elements. This is usually used to
 * create a singleton that all custom elements in a project can use.
 *
 * @example
 * export const registerWc = createRegisterWc(process.env.WC_PROD === 'true');
 *
 * // in an element class definition file
 * import { registerWc } from './path/to/register-wc';
 * class MyElement extends HTMLElement {}
 * registerWc('my-element', MyElement);
 */
export const createRegisterWc = (testMode = false) => {
  const exceptionMap: { [key: string]: boolean } = {};

  const createException = (name: string) => {
    exceptionMap[name] = true;
  };

  const removeException = (name: string) => {
    delete exceptionMap[name];
  };

  const registerWc = (name: string, clazz: any) => {
    try {
      customElements.define(name, clazz);
    } catch (error) {
      const matches = regex.exec(error.message);
      if (matches && matches[1] && exceptionMap[matches[1]]) {
        return;
      }

      throw error; // eslint-disable-line @typescript-eslint/no-throw-literal
    }
  };

  if (!testMode) {
    return {
      registerWc,
      createException: noop,
      removeException: noop,
    };
  }

  return {
    registerWc,
    createException,
    removeException,
  };
};
