## Project Details

## Technical Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Code Organization

```
├── .storybook/
├── cypress/
├── public/
│   └── locales/
│       └── <locale>/
│           └── translation.json
├── src/
│   ├── components/
│   │   └── __stories__/
│   ├── data/
│   │   └── <domain concept>/
│   │       ├── actions.ts
│   │       ├── context.tsx
│   │       ├── reducer.ts
│   │       └── types.ts
│   ├── styles/
│   └── ui/
│       ├── <page content>/
│       ├── routes.ts
│       └── index.tsx
├── i18n.ts
└── index.tsx
```

|                                         | Description                                                                                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .storybook                              | [storybook](https://storybook.js.org) setup files                                                                                                                                          |
| cypress                                 | files supporting end to end testing with [cypress](https://docs.cypress.io/)                                                                                                               |
| public                                  | contains static assets to be deployed alongside the react application.                                                                                                                     |
| public/locales                          | contains folders for each locale that the application will support. Currently only english (en) is supported                                                                               |
| src                                     | main source directory for the application                                                                                                                                                  |
| src/components                          | the source files for reusable components developed for this application. Storybook stories should be created for each component in this directory                                          |
| src/components/`__stories__`            | storybook stories used in developing components in this application (see components directory)                                                                                             |
| src/data                                | contains data retrieval (http, localstorage, etc) and state management code for the application. Subdirectories are organized by concepts which roughly map to features in the application |
| src/data/`<domain concept>`/context.tsx | if this application uses [React Context](https://reactjs.org/docs/context.html). This file establishes the react context for the particular domain concept                                 |
| src/data/`<domain concept>`/actions.ts  | action definitions using typescript-fsa to be used in conjunction with reducer.ts to manage state                                                                                          |
| src/data/`<domain concept>`/reducer.ts  | reducer definitions using typescript-fsa-reducers                                                                                                                                          |
| src/data/`<domain concept>`/types.ts    | Type definitions for state management                                                                                                                                                      |
| styles                                  | directory containing application level styling and theming                                                                                                                                 |
| src/ui                                  | Contains UI related code for the application                                                                                                                                               |
| src/ui/`<page content>`                 | UI related code for an individual "page" in the Application as defined by a particular route path (see routes.ts)                                                                          |
| src/ui/routes.ts                        | defines the uris used by react router within the single page application                                                                                                                   |
| i18n.ts                                 | the application level configuration for internationalization                                                                                                                               |
| index.tsx                               | the entry point into the react app                                                                                                                                                         |

### Dependencies

Below is a list of the primary libraries used to support this application. See package.json for the complete list.

| Dependency                                                                             | Description                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| @material-ui/core<br/>@material-ui/icons                                               | provides component and theming support for this application |
| i18next<br/>i18next-browser-languagedetector<br/>i18next-xhr-backend<br/>react-i18next | Internationalization support for the application            |
| react-router-dom<br/>static-route-paths                                                | Application level routing                                   |
| typescript-fsa<br/>typescript-fsa-reducers                                             | Application state management utilities                      |

### Enviornment Variables

> The environment variables in this application leverage [Create React App's Environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/). Note that environment variables in Create React App are established at BUILD TIME not runtime.

| Variable            | Description                                                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REACT_APP_VERSION` | this environment variable can optionally be set by a CI/CD environment to inform the application runtime of the build version. This is useful for cache busting, and is used in conjunction with `i18next-xhr-backend` |

### Local Development

#### Installation / Setup

- `git clone <repository-url>` this repository
- `cd project-directory`
- `yarn install`

#### Local Development

|                                 | Description                                                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn start`                    | Runs application in development mode with hot reload support<br/>Open [http://localhost:3000](http://localhost:3000) to view it in the browser |
| `yarn storybook`                | This project leverages storybook for component development and styling                                                                         |
| `yarn lint`<br/>`yarn lint:fix` | Runs ESLint to ensure proper styling and formatting as well as static code analysis for typescript/javascript files                            |

#### Testing

This application leverages a number of tools for test coverage

1. **jest** is used for unit test coverage
2. **jest-axe** is a jest addon to allow unit tests to validate accessibility of components
3. **cypress** is the test harness for executing end to end tests against the application

|                      | Description                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn test`          | Executes the unit test suite using jest in watch mode. This differs from `yarn test:watch` in that it will execute tests based on git revisions |
| `yarn test:watch`    | Executes the unit test suite using jest in watch mode                                                                                           |
| `yarn test:coverage` | Leverages jest to perform unit and component level testing for the application. Performs code coverage analysis                                 |
| `yarn test:e2e`      | Leverages cypress to perform end to end testing of the application                                                                              |

#### Building

|                | Description                                             |
| -------------- | ------------------------------------------------------- |
| `yarn clean`   | Cleans build directories                                |
| `yarn build`   | Builds the application for deployment (production mdoe) |
| `yarn analyze` | Analyzes build bundle sizes (run `yarn build` first)    |
