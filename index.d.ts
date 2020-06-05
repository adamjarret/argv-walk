declare namespace walkArgv {
  type Arg = {
    /**
     * Current `argv` item
     */
    item: string;

    /**
     * Current compound index if argument is a compound argument
     * (ex. `-abc`), otherwise undefined
     */
    compoundIndex: number | undefined;

    /**
     * Current `argv` index
     */
    index: number;

    /**
     * 1 if `value` is based on the next `argv` item, otherwise 0
     */
    indexOffset: 0 | 1;

    /**
     * true if argument used short syntax (ex. `-k` or `-abc`), otherwise false
     */
    isShort: boolean;

    /**
     * true if argument used strict syntax (ex. `--key=value` or `-k=value`), otherwise false
     */
    isStrict: boolean;

    /**
     * Parsed argument name
     * - null for positional arguments
     * - `"--"` for all arguments after `--` is encountered
     */
    key: string | null;

    /**
     * Parsed value for key
     */
    value: string | boolean;
  };

  type Options = {
    /**
     * Key or array of keys to always treat as booleans, or true
     * - If true, all double hyphenated arguments without equal signs are treated as boolean
     * (e.g. affects `--foo`, not `-f` or `--foo=bar`).
     */
    boolean?: true | string | string[];

    /**
     * Called with each argument
     * @returns If false is returned, the walk will stop (no further args will be processed)
     */
    onArg: (arg: Arg) => boolean | undefined | void;
  };
}

declare function walkArgv(argv: string[], opts: walkArgv.Options): void;

export = walkArgv;
