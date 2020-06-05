// @ts-check
// This code was extracted from [minimist](https://github.com/substack/minimist) v1.2.5 (MIT) and has been modified.

function walkArgv(argv, opts) {
  var flags = { bools: {} };
  var notFlags = [];

  if (opts && opts.onArg && typeof opts.onArg === 'function') {
    flags.onArg = opts.onArg;
  } else {
    throw new Error('onArg handler must be defined');
  }

  if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
    flags.allBools = true;
  } else {
    []
      .concat(opts['boolean'])
      .filter(Boolean)
      .forEach(function (key) {
        flags.bools[key] = true;
      });
  }

  if (argv.indexOf('--') !== -1) {
    notFlags = argv.slice(argv.indexOf('--') + 1);
    argv = argv.slice(0, argv.indexOf('--'));
  }

  function setArg(key, value, arg, index, indexOffset, compoundIndex, isShort, isStrict) {
    if (key === '__proto__') {
      // Prevent prototype pollution
      return;
    }
    if (
      flags.onArg({
        compoundIndex,
        index,
        indexOffset: indexOffset ? indexOffset : 0,
        isShort: !!isShort,
        isStrict: !!isStrict,
        item: arg,
        key,
        value
      }) === false
    ) {
      flags.stop = true;
    }
  }

  for (var i = 0; i < argv.length; i++) {
    var key, next;
    var arg = argv[i];

    if (/^--.+=/.test(arg)) {
      // Using [\s\S] instead of . because js doesn't support the
      // 'dotall' regex modifier. See:
      // http://stackoverflow.com/a/1068308/13216
      var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
      key = m[1];
      var value = m[2];
      if (flags.bools[key]) {
        value = value !== 'false';
      }
      setArg(key, value, arg, i, 0, undefined, false, true);
    } else if (/^--no-.+/.test(arg)) {
      key = arg.match(/^--no-(.+)/)[1];
      setArg(key, false, arg, i);
    } else if (/^--.+/.test(arg)) {
      key = arg.match(/^--(.+)/)[1];
      next = argv[i + 1];
      if (
        next !== undefined &&
        !/^-/.test(next) &&
        !flags.bools[key] &&
        !flags.allBools
      ) {
        setArg(key, next, arg, i, 1);
        i++;
      } else if (/^(true|false)$/.test(next)) {
        setArg(key, next === 'true', arg, i, 1);
        i++;
      } else {
        setArg(key, true, arg, i);
      }
    } else if (/^-[^-]+/.test(arg)) {
      var letters = arg.slice(1, -1).split('');

      var broken = false;
      for (var j = 0; j < letters.length; j++) {
        next = arg.slice(j + 2);

        if (next === '-') {
          setArg(letters[j], next, arg, i, 0, j, true);
          continue;
        }

        if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
          // compoundIndex (j) is omitted because '-v=1' is not a compound argument
          setArg(letters[j], next.split('=')[1], arg, i, 0, undefined, true, true);
          broken = true;
          break;
        }

        if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
          // compoundIndex (j) is omitted because '-n123' is not a compound argument
          setArg(letters[j], next, arg, i, 0, undefined, true);
          broken = true;
          break;
        }

        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
          // compoundIndex (j) is omitted for single short arguments (see slashBreak test)
          setArg(letters[j], arg.slice(j + 2), arg, i, 0, j > 0 ? j : undefined, true);
          broken = true;
          break;
        } else {
          setArg(letters[j], true, arg, i, 0, j, true);
        }
      }

      key = arg.slice(-1)[0];
      if (!broken && key !== '-') {
        // compoundIndex is undefined for single short arguments
        var compoundIndex = letters.length > 0 ? letters.length : undefined;
        if (argv[i + 1] && !/^(-|--)[^-]/.test(argv[i + 1]) && !flags.bools[key]) {
          setArg(key, argv[i + 1], arg, i, 1, compoundIndex, true);
          i++;
        } else if (argv[i + 1] && /^(true|false)$/.test(argv[i + 1])) {
          setArg(key, argv[i + 1] === 'true', arg, i, 1, compoundIndex, true);
          i++;
        } else {
          setArg(key, true, arg, i, 0, compoundIndex, true);
        }
      }
    } else {
      setArg(null, arg, arg, i);
    }

    if (flags.stop) {
      break;
    }
  }

  notFlags.forEach(function (arg, idx) {
    setArg('--', arg, arg, argv.length + idx);
  });
}

module.exports = walkArgv;
