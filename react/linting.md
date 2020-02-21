# Linting

DeveloperTown projects **must** utilize appropriate linters for static code analysis

## Why static code anaylsis?

## Configuring Linter (Typescript/Javascript)

At DeveloperTown we **should** use ESLint for static code analysis. ESLint can be used to staticly identify coding issues that may lead to bugs and may also be used to enforce style consistency. DeveloperTown projects **should** limit ESLint rules to preventing coding issues that may lead to bugs. DeverloperTown projects **should** leverage other tools to ensure a consistent coding style and format (see formatting.md for more on this)

### Install dev dependencies

```
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-react-app eslint-plugin-react-hooks
```

### Create .eslintrc.json to provide linter configuration

```json
{
  "extends": ["react-app", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Editor Integration (VSCode)

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Configuring Linter (SCSS/CSS)

At DeveloperTown we **should** leverage stylelint for static code analysis if we are writing CSS or SCSS to style applications

### Install dev dependencies

```
yarn add -D stylelint stylelint-config-recommended stylelint-config-recommended-scss stylelint-scss
```

### Create stylelint.json to provide linter configuration

```json
{
  "plugins": ["stylelint-scss"],
  "extends": "stylelint-config-recommended-scss",
  "rules": {
    "declaration-property-unit-whitelist": {
      "/^animation/": ["s", "ms"],
      "/^border/": ["rem", "%", "px"],
      "/^grid/": ["fr"],
      "background-color": ["%"],
      "font-size": ["rem"],
      "height": ["rem", "%", "vh", "vmin", "vmax", "em"],
      "line-height": ["rem"],
      "margin": ["rem", "%"],
      "padding": ["rem", "%"],
      "max-width": ["rem", "%", "em"],
      "min-width": ["rem", "%", "em"],
      "transform": ["deg", "%"],
      "width": ["rem", "%", "vw", "vmin", "vmax", "em"]
    },
    "function-calc-no-unspaced-operator": true,
    "indentation": 2,
    "no-empty-source": null,
    "number-leading-zero": "always",
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": [true, { "ignorePseudoElements": ["ng-deep"] }],
    "selector-no-vendor-prefix": true,
    "selector-type-no-unknown": null,
    "shorthand-property-no-redundant-values": true,
    "string-quotes": "double",
    "value-no-vendor-prefix": true
  }
}
```
