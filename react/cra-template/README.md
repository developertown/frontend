# @developertown/cra-template

[![Version](https://img.shields.io/npm/v/@developertown/cra-template.svg)](https://npmjs.org/package/@developertown/cra-template)
[![Downloads/week](https://img.shields.io/npm/dw/@developertown/cra-template.svg)](https://npmjs.org/package/@developertown/cra-template)
![License](https://img.shields.io/npm/l/@developertown/cra-template)

This is the official DeveloperTown TypeScript template for [Create React App](https://github.com/facebook/create-react-app).

To use this template, add `--template @developertown` when creating a new app.

For example:

```sh
npx create-react-app my-app --template @developertown

# or

yarn create react-app my-app --template @developertown
```

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.

#### Note for Windows Users

The template linter rules in this template are opinionated to support cross-platform development teams.  We would suggest
setting `core.autocrlf=false` in your git configuration, which will avoid having `git` convert line endings to `crlf`
during local development.

Additionally, `react-scripts` generates a file during installation that will automatically have Windows-style line-endings,
and will cause the build to fail due to linter failure.  After initial install, you will need to edit `src/react-app-env.d.ts`
and change the line endings to be Unix-style (`\n`).
