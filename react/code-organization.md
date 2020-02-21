# Code Organization

DeveloperTown projects **should** be bootstrapped using Create React App with typescript

## Why Code Organization

## Understanding the standard folder structure

```
├── public/
├── src/
│   ├── components/
│   ├── data/
│   │   └── <domain concept>/
│   │       ├── actions.ts
│   │       ├── context.tsx
│   │       ├── reducer.ts
│   │       ├── use<domain concept>.ts
│   │       └── types.ts
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   └── theme.ts
│   └── ui/
│       ├── <page content>/
│       │   └── components/
│       ├── routes.ts
│       └── index.tsx
└── index.tsx
```

|                                         | Description                                                                                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| public                                  | contains static assets to be deployed alongside the react application.                                                                                                                     |
| src                                     | main source directory for the application                                                                                                                                                  |
| src/components                          | the source files for reusable components developed for this application.  Components in this directory should only depend on Design System Component libraries (e.g Material UI).          |
| src/data                                | Contains data retrieval (http, localstorage, etc) and state management code for the application. Subdirectories are organized by concepts which roughly map to features in the application |
| src/data/`<domain concept>`/context.tsx | (Optional *) [React Context](https://reactjs.org/docs/context.html). This file establishes the react context for the particular domain concept                                             |
| src/data/`<domain concept>`/actions.ts  | action definitions using typescript-fsa to be used in conjunction with reducer.ts to manage state                                                                                          |
| src/data/`<domain concept>`/reducer.ts  | reducer definitions using typescript-fsa-reducers                                                                                                                                          |
| src/data/`<domain concept>`/use`<domain concept>`.ts  | custom hooks to make access data layer more easily                                                                                                                           |
| src/data/`<domain concept>`/types.ts    | Type definitions for state management                                                                                                                                                      |
| styles                                  | directory containing application level styling and theming                                                                                                                                 |
| styles/colors                           | defines standard color codes for the application.  Primarily used by theme.ts                                                                                                              |
| styles/fonts                            | defines and configures fonts for the application.  Primarily used by theme.ts                                                                                                              |
| styles/theme                            | configures application level themeing                                                                                                                                                      |
| src/ui                                  | Contains UI related code for the application                                                                                                                                               |
| src/ui/`<page content>`                 | UI related code for an individual "page" in the Application as defined by a particular route path (see routes.ts)                                                                          |
| src/ui/`<page content>`/components      | Components supporting a particular "page".  Unlike the top level components directory these components may depend on the data layer                                                        |
| src/ui/routes.ts                        | defines the uris used by react router within the single page application                                                                                                                   |
| i18n.ts                                 | the application level configuration for internationalization                                                                                                                               |
| index.tsx                               | the entry point into the react app                                                                                                                                                         |

