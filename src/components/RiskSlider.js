import { Slider } from "@material-ui/core";
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

export default function RiskSlider({onChange, ...props}) {
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };
    return (
        <React.Fragment>
            <Slider
                {...props}
                min={0}
                step={1}
                max={10}
                valueLabelDisplay="auto"
                marks={marks}
                track={false}
                onChange={handleChange}
            />
        </React.Fragment>
    )
}
