import React from 'react';
import { render } from "react-dom";
import App from "./containers/App";
import AliceTheme from "./theme/AliceTheme";
import { ThemeProvider } from "@material-ui/core";

render(<ThemeProvider theme={AliceTheme}><App /></ThemeProvider>, document.getElementById("app"));

