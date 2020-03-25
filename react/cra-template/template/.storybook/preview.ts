import { addDecorator, addParameters } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withI18n } from "storybook-addon-i18n";
import { muiTheme } from "storybook-addon-material-ui";
import i18n from "../src/i18n";
import theme from "../src/styles/theme";
import { I18nProvider, withCssBaseline } from "./decorators";

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
addParameters({
  i18n: {
    provider: I18nProvider,
    providerProps: {
      i18n,
    },
    supportedLocales: ["en"],
    providerLocaleKey: "locale",
  },
});
addDecorator(muiTheme([theme]));
addDecorator(withCssBaseline);
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(withI18n);
