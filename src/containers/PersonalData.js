import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    labeledInput: {
        marginBottom: theme.spacing(2),
    }
}));

export default function PersonalData() {
    const classes = useStyles();
    const onChangeSlider = value => {
        console.log('onChangeSlider', value);
    };
    return (
        <form>
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
        </form>
    )
}
