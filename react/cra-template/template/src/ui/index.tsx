import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Example from "../components/app";
import { routes } from "./routes";

const UnhandledError: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const errorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
};

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={UnhandledError} onError={errorHandler}>
      <Router>
        <Switch>
          <Route path={routes.path} component={Example} />
          <Redirect to={routes.path} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
