import { addons } from "@storybook/addons";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withI18n } from "storybook-addon-i18n";
import { muiTheme } from "storybook-addon-material-ui";
import i18n from "../src/i18n";
import theme from "../src/styles/theme";
import { I18nProvider, withCssBaseline } from "./decorators";

addons.setConfig({
  sortStoriesByKind: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  sidebarAnimations: false,
});

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  i18n: {
    provider: I18nProvider,
    providerProps: {
      i18n,
    },
    supportedLocales: ["en"],
    providerLocaleKey: "locale",
  },
};

export const decorators = [muiTheme([theme]), withCssBaseline, withKnobs, withA11y, withI18n];
