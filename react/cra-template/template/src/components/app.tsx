import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import logo from "./logo.svg";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    textAlign: "center",
  },
  header: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  logo: {
    height: "40vmin",
    pointerEvents: "none",
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "$logo-spin infinite 20s linear",
    },
  },
  link: {
    color: "#61dafb",
  },
  "@keyframes logo-spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

type CustomWindow = Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env?: any;
};

const App: React.FC = () => {
  const runtime: CustomWindow = window;
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
        {runtime.env && <p>{JSON.stringify(runtime.env)}</p>}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className={classes.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
