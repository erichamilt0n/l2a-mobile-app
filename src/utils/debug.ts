/* eslint-env browser, es2020 */

export const debug = {
  log: (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-restricted-globals
      globalThis.console.log(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-restricted-globals
      globalThis.console.error(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-restricted-globals
      globalThis.console.warn(...args);
    }
  },
};
