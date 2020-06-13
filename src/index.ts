const regex = /^.*name\s"([a-z]+-[a-z]+)".*$/;

const noop = () => {};

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
