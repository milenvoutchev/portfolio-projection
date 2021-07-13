import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(1),
    },
}));

export default function HorizontalStepper({ labels, components }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = labels || ['Step 1', 'Step 2'];
    const stepComponents = components || [
        <Typography>Content 1</Typography>,
        <Typography>Content 2</Typography>,
    ];

    const getStepComponent = (step) => {
        if (!stepComponents[step]) {
            throw new Error('Invalid step index');
        }

        return stepComponents[step];
    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isLastStep = activeStep => activeStep === steps.length - 1;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>
                <Grid item xs={12}>
                    {getStepComponent(activeStep)}
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                    </Button>

                    {!isLastStep(activeStep) &&
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Next
                    </Button>
                    }
                </Grid>
            </Grid>
        </div>
    );
}
