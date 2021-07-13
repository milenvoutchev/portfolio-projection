import { Button, Slider, Typography } from "@material-ui/core";
import React from "react";

const marks = [
    {
        value: 0,
        label: 'Cautious',
    },
    {
        value: 5,
        label: 'Neutral',
    },
    {
        value: 10,
        label: 'Bold',
    },
];

export default function RiskSlider({onChange}) {
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };
    return (
        <React.Fragment>
            <Slider
                min={0}
                step={1}
                max={10}
                defaultValue={5}
                aria-labelledby="risk-slider-label"
                valueLabelDisplay="auto"
                marks={marks}
                track={false}
                onChangeCommitted={handleChange}
            />
        </React.Fragment>
    )
}
