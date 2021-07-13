import React from "react";
import { Grid } from "@material-ui/core";

export default function Dashboard({name, income, risk}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                Ola {name}
                Income {income}
                Risk {risk}
            </Grid>
        </Grid>
    )
}
