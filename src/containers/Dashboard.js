import React from "react";
import { Grid } from "@material-ui/core";
import ProjectionChart from "../components/ProjectionChart";

export default function Dashboard({name, income, risk}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                Ola {name}
                Income {income}
                Risk {risk}
            </Grid>
            <Grid item xs={12}>
                <ProjectionChart />
            </Grid>
        </Grid>
    )
}
