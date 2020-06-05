const { ok } = require('assert');
const { testSync } = require('spooning');
const walkArgv = require('..');

testSync('error: no options', () => {
  const argv = ['-b'];
  try {
    walkArgv(argv);
    throw new Error('Did not throw');
  } catch (e) {
    ok(e.message.indexOf('onArg') > -1);
  }

  // END Test
});

testSync('error: no onArg', () => {
  const argv = ['-b'];
  try {
    walkArgv(argv, {});
    throw new Error('Did not throw');
  } catch (e) {
    ok(e.message.indexOf('onArg') > -1);
  }

  // END Test
});
