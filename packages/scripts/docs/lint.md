# > essex lint

Performs static checks (linting) operations over a project. Run `essex lint --help` for all options.

# CLI Options

- `--fix`<br/> attempt to fix correctable errors

- `--staged`<br/> only lint staged files. This is used internally in the default precommit configuration of **@essex/scripts**, and disables all but the `eslint` command.


# Details & Customization

The following static verification checks are performed when this command is invoked.

- ## eslint

  ### Purpose

  eslint performs static analysis of our JavaScript and TypeScript files to verify that they align with our expected idioms, and to prevent subtle errors from entering our source code.

  ### Customization

  - `<rootDir>/.eslintrc`<br/>
    `<rootDir>/.eslintignore`<br/>
    Linting configuration may be overridden by defining this file. By default the `plugin:@essex/experiment` preset will be used for linting. Details on that preset can be found in this repository under `packages/eslint-config`. Essex projects should have an .eslintrc file that extends from `@essex/experiment` and enables or disables certain rules. This ruleset disables stylistic rules, and allows prettier-based tooling to manage those.

- ## pretty-quick --check

  ### Purpose

  prettier performs automated code formatting. This check verifies that all code in the repository **would not be altered** by the formatter. This is useful in CI scenarios where we want to verify that all the source code matches our agreed-upon formatting specifications.

  ### Customization

  - `<rootDir>/.prettierrc` or `package.json::prettier`<br/>
    Prettier can be configured using these standard vectors. Essex projects should use the default Essex prettier configuration

    ```json
    /* package.json */
    "prettier": "@essex/prettier-config"
    ```
