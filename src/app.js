import React from 'react';
import { render } from "react-dom";
import App from "./containers/App";
import PortfolioProjectionTheme from "./theme/PortfolioProjectionTheme";
import { ThemeProvider } from "@material-ui/core";

render(<ThemeProvider theme={PortfolioProjectionTheme}><App /></ThemeProvider>, document.getElementById("app"));

