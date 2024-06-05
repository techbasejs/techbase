# Techbasejs

### Found an issue?

- Tag your issue with the tag `bug`
- Provide a short summary of what you are trying to do
- Provide the log of the encountered error if applicable
- Provide the exact version of commitlint. Check npm ls [library] when in doubt
- Be awesome and consider contributing a [contribute](#for-contribute)

### For contribute?

Please consider these guidelines when filling a pull request:

- Follow the [Coding Rules](#coding-rules)

- Follow the [Commit Rules](#commit-rules)

### Coding Rules

- Run `pnpm prettier` before create a pull request


### Commit Rules

Source use [commitlint](https://github.com/conventional-changelog/commitlint) for commit rules, you can follow the commit rules in the file [commitlint.config.js](/commitlint.config.js)

### Environment setup

> Required nodejs >= 18x & already installed `pnpm`

This project uses `pnpm`, so be sure that it is available in your shell environment.

After cloning the repo run:

```sh
pnpm install
```

A package already exists a folder `playground` for development, you can run `pnpm play` to starting a develop a package, if develop for `react` or `vue` library, you can run `pnpm play:react` or `pnpm play:vue`

Other scripts:

- Linting a package: `pnpm lint`
- Testing a package: `pnpm test`
- Publish a package: `pnpm release`

Example for playground a package

```sh

pnpm --filter ./packages/simm-fetch run play

```

### Publishing a release

Login into npmjs

```sh
npm login
```

Publish to npmjs

```sh
pnpm release
```

After release, a changelog file will be updated with current version of package, you need create a tag for github release.


Happy coding :)