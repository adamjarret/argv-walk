const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('bools: boolean', () => {
  const argv = ['moo', '--honk', 'cow'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    boolean: ['honk'],
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

testSync('bools: boolean and --x=true', () => {
  const argv = ['--boool', '--other=true'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'boool',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--boool',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'boool',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--other=true',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'other',
            value: 'true'
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

testSync('bools: boolean and --x=false', () => {
  const argv = ['--boool', '--other=false'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'boool',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--boool',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'boool',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--other=false',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'other',
            value: 'false'
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

testSync('bools: boolean --boool=true', () => {
  const argv = ['--boool=true'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'boool',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--boool=true',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'boool',
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

testSync('bools: boolean --boool=false', () => {
  const argv = ['--boool=false'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'boool',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--boool=false',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: true,
            key: 'boool',
            value: false
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

testSync('bools: boolean using something similar to true', () => {
  const argv = ['-h', 'true.txt'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'h',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-h',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'h',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'true.txt',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'true.txt'
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
