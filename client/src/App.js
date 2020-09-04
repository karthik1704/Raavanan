import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { theme } from "./theme";

import { useStyles } from "./AppStyle";

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <h1 className={classes.title}>இராவணன் கலைகூடம்</h1>
        <Button variant="contained" color="primary">
          Hi
        </Button>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
