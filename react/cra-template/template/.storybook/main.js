module.exports = {
  stories: ["../src/**/*.(stories|story).(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-notes",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-options",
    "@storybook/addon-a11y",
    "storybook-addon-i18n",
    "storybook-addon-material-ui",
  ],
};
