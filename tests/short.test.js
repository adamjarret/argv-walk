const { equal, deepEqual } = require('assert');
const { testSync, UnexpectedOutputError } = require('spooning');
const walkArgv = require('..');

testSync('short: boolean', () => {
  const argv = ['-b'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
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

        default:
          throw new Error(`Unexpected index: ${arg.index}`);
      }
    }
  });

  equal(callCount, expectedCallCount);
  // END Test
});

testSync('short: bare', () => {
  const argv = ['foo', 'bar', 'baz'];
  const expectedCallCount = 3;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'foo',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'foo'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'bar',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'bar'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: 'baz',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 0,
            isShort: false,
            isStrict: false,
            key: null,
            value: 'baz'
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

testSync('short: group', () => {
  const argv = ['-cats'];
  const expectedCallCount = 4;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          switch (arg.compoundIndex) {
            case 0: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 0,
                index: 0,
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

            case 2: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 2,
                index: 0,
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
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: 's',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            default:
              throw new Error(`Unexpected compoundIndex: ${arg.compoundIndex}`);
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

testSync('short: group next', () => {
  const argv = ['-cats', 'meow'];
  const expectedCallCount = 4;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          switch (arg.compoundIndex) {
            case 0: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 0,
                index: 0,
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

            case 2: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-cats',
                compoundIndex: 2,
                index: 0,
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
                index: 0,
                indexOffset: 1,
                isShort: true,
                isStrict: false,
                key: 's',
                value: 'meow'
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            default:
              throw new Error(`Unexpected compoundIndex: ${arg.compoundIndex}`);
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

testSync('short: capture', () => {
  const argv = ['-h', 'localhost'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-h',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'h',
            value: 'localhost'
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

testSync('short: capture multi', () => {
  const argv = ['-h', 'localhost', '-p', '555'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-h',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'h',
            value: 'localhost'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 2: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-p',
            compoundIndex: undefined,
            index: 2,
            indexOffset: 1,
            isShort: true,
            isStrict: false,
            key: 'p',
            value: '555'
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

testSync('short: strict', () => {
  const argv = ['-b=123'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-b=123',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: true,
            key: 'b',
            value: '123'
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

testSync('short: strict multi', () => {
  const argv = ['-a=whatever', '-b=robots'];
  const expectedCallCount = 2;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-a=whatever',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: true,
            key: 'a',
            value: 'whatever'
          });
          deepEqual(statusError.actual, statusError.expected, statusError.message);
          break;
        }

        case 1: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-b=robots',
            compoundIndex: undefined,
            index: 1,
            indexOffset: 0,
            isShort: true,
            isStrict: true,
            key: 'b',
            value: 'robots'
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

testSync('short: strict group-like', () => {
  const argv = ['-ab=123'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-ab=123',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: true,
            key: 'a',
            value: '123'
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

testSync('short: numeric', () => {
  const argv = ['-n123'];
  const expectedCallCount = 1;
  let callCount = 0;
  walkArgv(argv, {
    onArg: (arg) => {
      callCount++;
      switch (arg.index) {
        case 0: {
          const statusError = new UnexpectedOutputError(arg, {
            item: '-n123',
            compoundIndex: undefined,
            index: 0,
            indexOffset: 0,
            isShort: true,
            isStrict: false,
            key: 'n',
            value: '123'
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

testSync('short: numeric group', () => {
  const argv = ['-123', '456'];
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
                item: '-123',
                compoundIndex: 0,
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: '1',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 1: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-123',
                compoundIndex: 1,
                index: 0,
                indexOffset: 0,
                isShort: true,
                isStrict: false,
                key: '2',
                value: true
              });
              deepEqual(statusError.actual, statusError.expected, statusError.message);
              break;
            }

            case 2: {
              const statusError = new UnexpectedOutputError(arg, {
                item: '-123',
                compoundIndex: 2,
                index: 0,
                indexOffset: 1,
                isShort: true,
                isStrict: false,
                key: '3',
                value: '456'
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
