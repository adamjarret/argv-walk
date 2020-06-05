const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('allBools: boolean=true', () => {
  const argv = ['moo', '--honk', 'cow'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    boolean: true,
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
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--honk',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'honk',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'cow',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'cow'
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

testSync('allBools: boolean=true, only affect double hyphen non-strict arguments', () => {
  const argv = ['moo', '--honk', 'cow', '-p', '55', '--tacos=good'];
  const expectedCallCount = 5;
  let callCount = 0;
  walkArgv(argv, {
    boolean: true,
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
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--honk',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'honk',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'cow',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'cow'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 3: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-p',
            compoundIndex: undefined,
            index: 3,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'p',
            value: '55'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 5: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--tacos=good',
            compoundIndex: undefined,
            index: 5,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'tacos',
            value: 'good'
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
