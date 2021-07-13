import NumberFormat from "react-number-format";

import { TextField, Typography } from "@material-ui/core";

export default function CurrencyInput(props) {
    return (
        <NumberFormat
            {...props}
            customInput={TextField}
            prefix={'$'}
            type="text"
            thousandSeparator={props.thousandSeparator ? ' ' : null}
            onValueChange={props.onChange ? ({value}) => props.onChange(value) : null}
        />
    )
}
