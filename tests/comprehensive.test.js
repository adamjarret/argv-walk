const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('comprehensive', () => {
  const argv = [
    '--name=meowmers',
    'bare',
    '-cats',
    'woo',
    '-h',
    'awesome',
    '--multi=quux',
    '--key',
    'value',
    '-b',
    '--bool',
    '--no-meep',
    '--multi=baz',
    '--',
    '--not-a-flag',
    'eek'
  ];
  const expectedCallCount = 15;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--name=meowmers',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'name',
            value: 'meowmers'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'bare',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'bare'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          switch (arg.compoundIndex) {
            case 0: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 0,
                index: 2,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 'c',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 1: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 1,
                index: 2,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 'a',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 2: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 2,
                index: 2,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 't',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 3: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 3,
                index: 2,
                indexOffset: 1,
                isShort: true,
                isStrict: false,
                key: 's',
                value: 'woo'
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            default:
              throw new Error(`Unexpected compoundIndex: ${arg.compoundIndex}`);
          }
          break;
        }

        case 4: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-h',
            compoundIndex: undefined,
            index: 4,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'h',
            value: 'awesome'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 6: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--multi=quux',
            compoundIndex: undefined,
            index: 6,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'multi',
            value: 'quux'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 7: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--key',
            compoundIndex: undefined,
            index: 7,
            indexOffset: 1,
            isShort: false,
            isStrict: false,
            key: 'key',
            value: 'value'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 9: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-b',
            compoundIndex: undefined,
            index: 9,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'b',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 10: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--bool',
            compoundIndex: undefined,
            index: 10,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'bool',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 11: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--no-meep',
            compoundIndex: undefined,
            index: 11,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'meep',
            value: false
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 12: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--multi=baz',
            compoundIndex: undefined,
            index: 12,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'multi',
            value: 'baz'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 13: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--not-a-flag',
            compoundIndex: undefined,
            index: 13,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: '--',
            value: '--not-a-flag'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 14: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'eek',
            compoundIndex: undefined,
            index: 14,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: '--',
            value: 'eek'
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
