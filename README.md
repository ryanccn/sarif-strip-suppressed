# sarif-strip-suppressed

A small CLI tool to strip suppressed results from [SARIF](https://github.com/microsoft/sarif-tutorials/blob/main/docs/1-Introduction.md) files for tools such as [GitHub code scanning](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning) that do not support the `suppressions` key.

## Usage

```console
$ npx @ryanccn/sarif-strip-suppressed result.sarif
```

or install globally:

```console
$ npm i -g @ryanccn/sarif-strip-suppressed
```

## License

MIT
