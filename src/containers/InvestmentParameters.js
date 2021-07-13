import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import RiskSlider from "../components/RiskSlider";
import CurrencyInput from "../components/CurrencyInput";

const useStyles = makeStyles((theme) => ({
    labeledInput: {
        marginBottom: theme.spacing(2),
    }
}));

export default function InvestmentParameters() {
    const classes = useStyles();

    const onChangeSlider = value => {
        console.log('onChangeSlider', value);
    };
    return (
        <form>
            <div className={classes.labeledInput}>
                <Typography id="income-label">
                    How much do you earn ($/month)?
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
        </form>
    )
}
