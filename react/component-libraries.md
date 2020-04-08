# Component Libraries

Often DeveloperTown clients want to provide a standard look and feel across several applications. Leveraging an open source component library like material-ui is a cost effective way to build consistent user experiences.

## Why build for Component Libraries

## Storybook

Storybook is a great tool for building a new or extending an existing component library. DeveloperTown projects should consider leveraging storybook in scenarios where

### Install dev dependencies

```
yarn add -D @storybook/react @storybook/preset-create-react-app @storybook/addon-options @storybook/addon-notes @storybook/addon-knobs @storybook/addon-viewport
```

### Create .storybook/preview.ts

```ts
import { addDecorator, addParameters, configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
setOptions({
  sortStoriesByKind: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  sidebarAnimations: false,
});

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
addDecorator(withKnobs);
```

### Configure Addons .storybook/main.js

```js
module.exports = {
  stories: ["../src/**/*.(stories|story).(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-notes",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-options",
  ],
};
```

### Add npm scripts

```
"scripts": {
  "storybook": "start-storybook -s ./public",
}
```

## Material UI

### Install Dependencies

```
yarn add @material-ui/core @material-ui/icons
```

### Define a Theme

// colors.ts

```ts
export const black = "#000000";
export const white = "#ffffff";
// other colors here
```

// theme.ts

```ts
import { createMuiTheme } from "@material-ui/core/styles";
import { black, white } from "./colors";

const defaultTheme = createMuiTheme({
  palette: {
    common: {
      black,
      white,
    },
  },
});

export default defaultTheme;
```

### Usage

```tsx
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyThemedComponent></MyThemedComponent>
    </I18nextProvider>
  );
};

const MyThemedComponent: React.FC = () => {
  const [t] = useTranslation();
  return <p>t("some.translation")</p>;
};
```

## Material UI with Storybook

### Install dev Dependencies

```
yarn add -D storybook-addon-material-ui
```

### Configure .storybook/preview.ts

```ts
import { addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../src/styles/theme";

addDecorator(muiTheme([theme]));
```

### Configure Addons .storybook/main.js

```js
module.exports = {
  addons: [
    //...other addons
    "storybook-addon-material-ui",
  ],
};
```
