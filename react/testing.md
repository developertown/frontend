# Testing

At DeveloperTown projects **should** use [Jest](https://jestjs.io/) for unit and integration test coverage. DeveloperTown projects **should** leverage [Cypress](https://www.cypress.io/) for end to end test coverage. [Create React App](https://create-react-app.dev/) comes pre-installed with Jest as the testing framework of choice. In conjunction with Jest and Cypress DeveloperTown projects **should** use the [@testing-library](https://testing-library.com/) family of tools. @testing-library was recently added to the default create react app template.

## Unit Testing

### What to Unit Test?

## Integration Testing

### What to Integration Test?

## End to End Testing

### What to End to End Test?

## Jest Configuration

Create React App comes pre-configured with Jest and is largely configured for our needs out of the box. Below are a few minor changes to be aware of.

### src/setupTests.ts

The setupTests.ts file can be used to add global configuration before tests are run. Create React App comes pre-configured with the necessary settings to support @testing-library/jsdom. More on setupTest.ts can be found in [Create React App's documentation](https://create-react-app.dev/docs/running-tests/#option-2-react-testing-library)

```ts
import "@testing-library/jest-dom/extend-expect";
```

### Extending ESLint (.eslintrc.json) to detect jest issues

```
yarn add -D eslint-plugin-jest
```

```json
{
  "extends": [
    ...,
    "plugin:jest/recommended",
  ],
  "plugins": [..., "jest"],
}
```

### Add Test Scripts (package.json)

By default Jest (`yarn test`) will watch for file changes and run only the files that have changed based on git revisions. Sometimes it is nice to watch all files and rerun all tests in the test suite. Below adds a `yarn test:watch` command which does just this.

```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:watch": "npm run test -- --watchAll"
  }
}
```

## Configure Test Coverage

Jest can be configured to generate a code coverage report.

### Install dev dependencies

By default Jest can capture code coverage. The following dependencies provide alternative ways to produce coverage reports and process the coverage results. These are necessary for the CI/CD Pipeline

```
yarn add -D jest-junit jest-sonar-reporter
```

### Add Test Scripts (package.json)

```json
{
  "scripts": {
    "test:coverage": "npm run test -- --watchAll=false --coverage --reporters=default --reporters=jest-junit --testResultsProcessor=jest-sonar-reporter"
  }
}
```

### Ignore Test Reports (.gitignore)

```
junit.xml
test-report.xml
```

### Configure Jest (package.json)

https://create-react-app.dev/docs/running-tests/#coverage-reporting

```json
{
  "jest": {
    "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}", "!src/{setupProxy,serviceWorker}.{js,jsx,ts,tsx}"],
    "coverageReporters": ["json", "lcov", "text", "clover", "cobertura"]
  }
}
```

## Cypress Configuration

Create React App **does not** come pre-configured with Cypress but Cypress is easy to add and largely configures itself with some good defaults

### Install dev dependencies

```
yarn add -D cypress
```

### Cypress Settings (cypress.json)

```json
{
  "baseUrl": "http://localhost:3000",
  "video": false,
  "chromeWebSecurity": false
}
```

### Extending ESLint (.eslintrc.json) to detect cypress issues

```
yarn add -D eslint-plugin-cypress
```

```json
{
  "extends": [
    ...,
    "plugin:cypress/recommended",
  ],
  "plugins": [..., "cypress"],
  "env": {
    "cypress/globals": true
  }
}
```

### Add Test Scripts (package.json)

Cypress comes with a cli tool to support running and developing new tests with Cypress. However it can be nice to add a package script to make interacting with the end to end test suite a bit easier. `yarn test:e2e` will launch the Cypress UI and is most suitable for use when developing tests. In a CI/CD environment we will use `cypress run` to run Cypress with a headless browser.

```json
{
  "scripts": {
    "test:e2e": "cypress open"
  }
}
```
