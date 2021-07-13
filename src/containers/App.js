import React from 'react';
import HorizontalStepper from "./HorizontalStepper";
import Typography from "@material-ui/core/Typography";
import PersonalData from "./PersonalData";
import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Hero from "../components/Hero";
import InvestmentParameters from "./InvestmentParameters";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        margin: theme.spacing(1),
    },
}));
export default function App() {
    const classes = useStyles();

    const labels = ['Personal Data', 'Investment Parameters', 'Portfolio Projection'];
    const components = [
        <PersonalData/>,
        <InvestmentParameters/>,
        <Typography>Dashboard</Typography>,
    ];

    return (
        <Container maxWidth="md">
            <Paper variant="elevation" className={classes.paper}>
                <Hero/>
            </Paper>
            <Paper variant="elevation" className={classes.paper}>
                <HorizontalStepper labels={labels} components={components}/>
            </Paper>
        </Container>
    )
}
