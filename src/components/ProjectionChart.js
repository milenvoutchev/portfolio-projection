import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { withTheme } from '@material-ui/styles';

const SAMPLE_DATA = [
    {
        name: '07.2017',
        portfolio: 2000,
        contributions: 1000,
        returns: 1000,
    },
    {
        name: '08.2017',
        portfolio: 2200,
        contributions: 1100,
        returns: 1100,
    },
    {
        name: '09.2017',
        portfolio: 2400,
        contributions: 1200,
        returns: 1200,
    },
    {
        name: '10.2017',
        portfolio: 2600,
        contributions: 1300,
        returns: 1300,
    },
];

export default withTheme(function ProjectionChart({theme, data = SAMPLE_DATA}) {
    console.log(theme);
    // const {theme, data} = props;

    return (
        <ResponsiveContainer width="99%" height={225}>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="portfolio" stackId="1" fill={theme.palette.common.portfolio} />
                <Area type="monotone" dataKey="contributions" stackId="1" fill={theme.palette.common.contributions} />
                <Area type="monotone" dataKey="returns" stackId="1" fill={theme.palette.common.returns} />
            </AreaChart>
        </ResponsiveContainer>
    );
});
