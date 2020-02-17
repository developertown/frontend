# Formatting

DeveloperTown projects **should** utilize code formatters to ensure consistent styling across a growing code base. There are a number of tools that can be used to achieve consistent code formatting and styling. At DeveloperTown projects should leverage [editorconfig](https://editorconfig.org/) and [prettier](https://prettier.io/)

## Why Format Code

## Configuring your Editor (editorconfig)

Most modern editors can be configured programatically through some common configuration files and tools. These configuration files **should** live in the source repository along side the application code so that all contributors of the code base will have the same settings.

### Create .editorconfig to provide editor configuration

```
# Editor configuration, see http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

## Configuring your Editor (prettier)

### Install dev dependencies

```
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

### Create .prettierrc to provide prettier integration

> Often teams have specific opinions on how code should be formatted/styled and these preferences may vary by programming language. Prettier can be informed of these preferences through the `.prettierrc` file, one such example is below.

```json
{
  "printWidth": 120,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

### Create .prettierignore

> Sometimes there are files that you may not want to format. Prettier can be told to exclude certain files with a `.prettierignore` file, one such example is below.

```
/src/public
```

### Integrating prettier with linting tools (.eslintrc.json)

> As discussed on linting.md DeveloperTown prefers to use ESLint to ensure code quality. While ESLint is flexible enough to enforce code style the recommendation is to limit ESLint rules to preventing bugs and leveraging tools like Prettier for the code style concerns. ESLint can be informed of the style and formatting rules that are defined by the above prettier configs.

```json
{
  "extends": ["plugin:prettier/recommended", "prettier/@typescript-eslint"]
}
```
