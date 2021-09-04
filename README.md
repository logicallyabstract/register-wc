# register-wc

Register a Web Component with the optionality for a test-friendly override

## NOTE:

While this library will continue to receive maintenance updates, please consider researching the work going into import maps for the browser. This looks to be a promising way to provide mocks in the browser using an esbuild test runner/server. This technique could be combined with using an iframe per test or test suite to ensure that unit tests are fully isolated, with mocked components.

Fundamentally, source code should not be allowed to know if it is under test or not and this library must violate that rule in order to work around the lack of vetted solutions by the standards groups.

## Get Started

`npm install --save @logicallyabstract/register-wc`

## Usage

### Register a component

Create a singleton for your project to use:

```typescript
import { createRegisterWc } from '@logicallyabstract/register-wc';

const { registerWc, createException, removeException } = createRegisterWc(
  process.env.WC_TEST === 'true',
);

export { registerWc, createException, removeException };
```

Use a build tool with plugins like [rollup.js](https://rollupjs.org/) to provide the substitutions needed for statements like `process.env.VARIABLE` in front end code. With this technique, you can control whether or not `createException` and `removeException` are noops and will throw errors normally. The only environment that we would want to supress those errors for would be local unit testing or unit testing in continuous integration.

### Testing a component

Suppressing these errors allows us to mock child web components per test file when running each test file in its own iframe. A tool to do this is [@logicallyabstract/simple-test-runner](https://github.com/logicallyabstract/simple-test-runner).

```typescript
// using mocha-style globals

import { createException, removeException } from './path/to/singleton';

describe('component test', () => {
  before(async () => {
    createException('child-component');

    class MockChildComponent extends HTMLElement {}

    customElements.define('child-component', MockChildComponent);

    await import('./path/to/component');
  });

  it('should create an element without an error about an already registered child component', () => {
    // create a test fixture for the DOM and test the component
  });
});
```
