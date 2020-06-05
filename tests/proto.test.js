const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('proto: long', () => {
  const argv = ['--__proto__', 'foo'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'foo',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'foo'
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

testSync('proto: strict', () => {
  const argv = ['--__proto__=foo'];
  //const expectedCallCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      throw new Error(`Unexpected index: ${arg.index}`);
    }
  });

  // END Test
});
