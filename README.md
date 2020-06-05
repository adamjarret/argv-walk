# argv-walk

[![Package Version](https://badgen.net/npm/v/argv-walk)](https://npmjs.com/package/argv-walk)
[![Git Repository](https://badgen.net/badge/source/GitHub/blue)](https://github.com/adamjarret/argv-walk)
[![Dependencies](https://badgen.net/david/dep/adamjarret/argv-walk)](https://david-dm.org/adamjarret/argv-walk)
[![Install Size](https://badgen.net/packagephobia/install/argv-walk)](https://packagephobia.now.sh/result?p=argv-walk)

Process command line arguments with complete control over how they are interpreted by defining a function to handle each parsed value.

- Based on [minimist](https://github.com/substack/minimist)
- 100% unit test coverage
- Zero dependencies (124 LOC)
- Supports node 6+

## Installation

    npm install argv-walk

or

    yarn add argv-walk

## Usage

```js
const walkArgv = require('argv-walk');

const args = { _: [] };

walkArgv(process.argv.slice(2), {
  onArg: (arg) => {
    if (arg.key) {
      args[arg.key] = arg.value;
    } else {
      args._.push(arg.item);
    }
  }
});
```

argv-walk is a lower level package than minimist so it has no concept of abstractions like aliases or types other than string and boolean.

This package is most useful when you would like to to provide your own implementations of such abstractions (or don't need them).

## API

### `walkArgv`

▸ **walkArgv**(`argv`: _string[]_, `options`: _[Options](#options)_): _void_

Iterate over `argv` array and call `options.onArg` for each parsed argument.

Uses minimist parsing conventions with the following differences:

- number-like values are NOT converted to numbers (they remain strings)
- dot separated arguments (ex. `--foo.bar`) are NOT treated differently than other arguments (when processing the preceding example, the argument `key` would be `"foo.bar"`)

**Returns:** _void_

---

### <a id="options" name="options"></a> `Options` Properties

#### `boolean`

▸ **boolean**?: _true_ | _string_ | _string[]_

**Optional:** Key or array of keys to always treat as booleans, or true

If true, all double hyphenated arguments without equal signs are treated as boolean (e.g. affects `--foo`, not `-f` or `--foo=bar`).

#### `onArg`

▸ **onArg**(arg: _[Arg](#arg)_): _boolean_ | _undefined_ | _void_

Called with each argument

**Returns:** If false is returned, the walk will stop (no further args will be processed)

---

### <a id="arg" name="arg"></a> `Arg` Properties

#### `item`

▸ **item**: _string_

> Current `argv` item

#### `index`

▸ **index**: _number_

> Current `argv` index

#### `indexOffset`

▸ **indexOffset**: _number_

> 1 if `value` is based on the next `argv` item, otherwise 0

#### `compoundIndex`

▸ **compoundIndex**: _number_ | _undefined_

> Current compound index if argument is a compound argument (ex. `-abc`), otherwise undefined

**Example:** When processing `-abc`, `a` would have `compoundIndex` 0, `b` would have `compoundIndex` 1 and so on. The `index` value for all three keys would be the same (in this case 0).

#### `isShort`

▸ **isShort**: _boolean_

> true if argument used short syntax (ex. `-k` or `-abc`), otherwise false

#### `isStrict`

▸ **isStrict**: _boolean_

> true if argument used strict syntax (ex. `--key=value` or `-k=value`), otherwise false

#### `key`

▸ **key**: _null_ | _string_

> Parsed argument name

- null for positional arguments
- `"--"` for all arguments after `--` is encountered

#### `value`

▸ **value**: _boolean_ | _string_

> Parsed value for key

---

---

## Development

### Requirements

- [git](https://www.git-scm.com)
- [node](https://nodejs.org/) 8+ (argv-walk supports node 6+, but 8+ is required to run all package scripts except `test`)
- [yarn](https://yarnpkg.com)

### Setup

    git clone https://github.com/adamjarret/argv-walk.git
    cd argv-walk
    yarn

If you use [VS Code](https://code.visualstudio.com), see **.vscode/settings.sample.json** for recommended project settings.

### Run Tests

    yarn test

## Package Scripts

### `yarn fix`

Runs all the scripts required to format and check the module.

### `yarn lint`

Runs `eslint` (see [eslint](https://eslint.org)) on all javascript files not ignored in the **.eslintignore** file.

See **.eslintrc.js** for configuration.

### `yarn pretty`

Runs `prettier` (see [prettier](https://prettier.io)) to check source code file format. Files with the extensions **ts**, **js**, **json** or **md** that are not ignored in the **.eslintignore** file are processed.

See **.prettierrc.js** for configuration.

### `yarn spell`

Runs `cspell` (see [cspell](https://www.npmjs.com/package/cspell)) to spell-check source code files.

See **.vscode/cSpell.json** for configuration.

Note: This configuration path is used so the settings can also be honored by the [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) plugin for VS Code.

### `yarn ncu`

Runs `ncu` (see [npm-check-updates](https://github.com/tjunnone/npm-check-updates)) to check for dependency updates.

Use the `-u` flag to update version numbers in **package.json** file.

Any additional arguments will be passed to the `ncu` command.

### `yarn test`

Runs all unit tests with [spooning](https://adamjarret.github.io/spooning).

### `yarn cover`

Same as `yarn test` but also collects and outputs test coverage information.

## License

[MIT](https://github.com/adamjarret/argv-walk/tree/master/LICENSE.txt)

## Author

[Adam Jarret](https://atj.me)
