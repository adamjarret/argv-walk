const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('edge: positional arg with equals sign', () => {
  const argv = ['bar=baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'bar=baz',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'bar=baz'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});

testSync('edge: short strict value with equals sign', () => {
  const argv = ['-f=bar=baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-f=bar=baz',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: true,
            key: 'f',
            // This different value is an example of inconsistent behavior between short/long strict args
            value: 'bar'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});

testSync('edge: short value with equals sign', () => {
  const argv = ['-f', 'bar=baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-f',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'f',
            value: 'bar=baz'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});

testSync('edge: strict value with equals sign', () => {
  const argv = ['--foo=bar=baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--foo=bar=baz',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'foo',
            value: 'bar=baz'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});

testSync('edge: value with equals sign', () => {
  const argv = ['--foo', 'bar=baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--foo',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: false,
            isStrict: false,
            key: 'foo',
            value: 'bar=baz'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});
