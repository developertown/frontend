import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

const withCssBaseline = (storyFn) => {
  return (
    <>
      <CssBaseline />
      {storyFn()}
    </>
  );
};
export default withCssBaseline;
