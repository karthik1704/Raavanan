import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { theme } from "./theme";

import { useStyles } from "./AppStyle";

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <h1 className={classes.title}>இராவணன் கலைகூடம்</h1>
      <Button variant="contained" color="primary">
        Hi
      </Button>
    </ThemeProvider>
  );
}

export default App;
