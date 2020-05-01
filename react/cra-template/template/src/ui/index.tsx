import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Example from "../components/app";
import { routes } from "./routes";

const UnhandledError: React.FC<FallbackProps> = ({ error, componentStack }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={UnhandledError}>
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
