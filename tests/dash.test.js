const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('dash: alone', () => {
  const argv = ['-'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: '-'
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

testSync('dash: short', () => {
  const argv = ['-n', '-'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-n',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'n',
            value: '-'
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

testSync('dash: short trailing dash', () => {
  const argv = ['-f-'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-f-',
            compoundIndex: 0,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'f',
            value: '-'
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

testSync('dash: short boolean', () => {
  const argv = ['-b', '-'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    boolean: 'b',
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-b',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'b',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: '-'
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

testSync('dash: -a -- b', () => {
  const argv = ['-a', '--', 'b'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-a',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'a',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'b',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: '--',
            value: 'b'
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

testSync('dash: --a -- b', () => {
  const argv = ['--a', '--', 'b'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--a',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: 'a',
            value: true
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'b',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: '--',
            value: 'b'
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

testSync('dash: handle arguments after -- separately', () => {
  const argv = ['--name', 'John', 'before', '--', 'after'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '--name',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: false,
            isStrict: false,
            key: 'name',
            value: 'John'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'before',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'before'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 3: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'after',
            compoundIndex: undefined,
            index: 3,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: '--',
            value: 'after'
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
