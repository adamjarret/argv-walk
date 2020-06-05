const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('parse: flag boolean value', () => {
  const argv = ['--verbose', 'false', 'moo', '-t', 'true'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    boolean: ['t', 'verbose'],
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--verbose',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: false,
            isStrict: false,
            key: 'verbose',
            value: false
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'moo',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'moo'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 3: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-t',
            compoundIndex: undefined,
            index: 3,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 't',
            value: true
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

testSync('parse: newlines in short params', () => {
  const argv = ['-s', 'X\nX'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-s',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 's',
            value: 'X\nX'
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

testSync('parse: newlines in strict params', () => {
  // reproduce in bash:
  // VALUE="new
  // line"
  // node program.js --s="$VALUE"

  const argv = ['--s=X\nX'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--s=X\nX',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 's',
            value: 'X\nX'
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

testSync('parse: slashBreak', () => {
  const argv = ['-I/foo/bar/baz'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-I/foo/bar/baz',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'I',
            value: '/foo/bar/baz'
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

testSync('parse: slashBreak group', () => {
  const argv = ['-xyz/foo/bar/baz'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          switch (arg.compoundIndex) {
            case 0: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-xyz/foo/bar/baz',
                compoundIndex: 0,
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 'x',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 1: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-xyz/foo/bar/baz',
                compoundIndex: 1,
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 'y',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 2: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-xyz/foo/bar/baz',
                compoundIndex: 2,
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 'z',
                value: '/foo/bar/baz'
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            default:
              throw new Error(`Unexpected index: ${arg.index}`);
          }
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

testSync('parse: whitespace should be whitespace', () => {
  const argv = ['-x', '\t'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-x',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'x',
            value: '\t'
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
