const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('stopEarly', () => {
  const argv = ['moo', '--honk', 'cow'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'moo',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'moo'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);

          // Return false to stop walk
          return false;
        }

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});
