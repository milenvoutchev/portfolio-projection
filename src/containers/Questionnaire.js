import React from "react";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, Container, Paper, Slider, TextField, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import RiskSlider from "../components/RiskSlider";
import CurrencyInput from "../components/CurrencyInput";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        margin: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
    labeledInput: {
        marginBottom: theme.spacing(2),
    }
}));

export default function Questionnaire() {
    const classes = useStyles();
    const onChangeSlider = value => {
        console.log('onChangeSlider', value);
    };
    return (
        <Container maxWidth="xs">
            <Paper variant="elevation" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Portfolio Allocation Model
                </Typography>
                <Typography align="center">
                    Every portfolio is different. Our allocation tool offer model portfolios based on various risk tolerances to help understand different ways a portfolio can be
                    constructed.
                </Typography>
            </Paper>

            <Paper variant="elevation" className={classes.paper}>
                <form className={classes.form}>
                    <div className={classes.labeledInput}>
                        <Typography id="username-label">
                            What’s your name?
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            autoFocus
                            aria-labelledby="username-label"
                        />
                    </div>

                    <div className={classes.labeledInput}>
                        <Typography id="income-label">
                            How much do you earn per month?
                        </Typography>

                        <CurrencyInput
                            defaultValue={2000}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="income"
                            aria-labelledby="income-label"
                            onChange={(value) => console.log(value)}
                        />
                    </div>

                    <div className={classes.labeledInput}>
                        <Typography id="risk-slider-label">
                            What is your risk tolerance level?
                        </Typography>
                        <RiskSlider
                            onChange={onChangeSlider}/>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Open Portfolio Projection
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
