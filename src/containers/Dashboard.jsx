import React, { useEffect, useState } from "react";
import { Grid, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import ProjectionChart from "../components/ProjectionChart";
import PortfolioCalculation from "../service/PortfolioCalculation";

const useStyles = makeStyles((theme) => ({
    paragraph: {
        marginTop: theme.spacing(1),
    }
}))
export default function Dashboard({name, income, risk}) {
    const classes = useStyles();
    const [performance, setPerformance] = useState([]);
    const [periodStart, setPeriodStart] = useState();
    const [periodEnd, setPeriodEnd] = useState();
    const [portfolioAmount, setPortfolioAmount] = useState();
    const [portfolioName, setPortfolioName] = useState();
    const [returns, setReturns] = useState();
    const [contributions, setContributions] = useState();
    const [monthlyInvestment, setMonthlyInvestment] = useState();
    const [contributionPercentage, setContributionPercentage] = useState();
    const [portfolioRatios, setPortfolioRatios] = useState([]);
    const portfolioCalculation = new PortfolioCalculation(risk, income);

    useEffect(() => {
        portfolioCalculation.getProjection()
            .then(projection => {
                setPerformance(projection.performance);
                setPeriodStart(new Date(projection.meta.periodStart).toDateString());
                setPeriodEnd(new Date(projection.meta.periodEnd).toDateString());
                setPortfolioAmount(projection.meta.portfolioAmount);
                setPortfolioName(projection.meta.portfolioName);
                setReturns(projection.meta.returns);
                setContributions(projection.meta.contributions);
                setMonthlyInvestment(projection.meta.monthlyInvestment);
                setContributionPercentage(projection.meta.contributionPercentage);
                setPortfolioRatios(projection.meta.portfolioRatios);
            });
    }, []);

    const getTickersWithRatios = (portfolioRatios = []) => portfolioRatios.map(ratioItem => `${ratioItem.ticker} (${ratioItem.weight * 100}%)`);

    return (
        <React.Fragment>
            {performance.length ?
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.paragraph}>
                            Hello {name}!
                        </Typography>
                        <Typography variant="body1" className={classes.paragraph}>
                            At risk level of <b>{risk}</b>, your portfolio is <b>{portfolioName}</b>.
                            Every month you are investing <b>${monthlyInvestment}</b> or {contributionPercentage*100}% of your monthly income.
                            Your purchases are distributed between {getTickersWithRatios(portfolioRatios).join(", ")}.
                        </Typography>
                        <Typography variant="body1" className={classes.paragraph}>
                            Your portfolio has developed between <b>{periodStart}</b> and <b>{periodEnd}</b> for a total of <b>{performance.length}</b> months.
                        </Typography>
                        <Typography variant="body1" className={classes.paragraph}>
                            By that point, the total portfolio amount is at <b>${portfolioAmount}</b>.
                        </Typography>
                        <Typography variant="body1" className={classes.paragraph}>
                            Of that total, contributions account for <b>${contributions}</b> while <b>${returns}</b> is earned returns.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ProjectionChart data={performance}/>
                    </Grid>
                </Grid>
                :
                <LinearProgress/>
            }
        </React.Fragment>
    )
}
