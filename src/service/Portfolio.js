import { add, eachMonthOfInterval, isBefore, isSameDay, lightFormat as format } from "date-fns";
import Fmp from "./Fmp";

const CONTRIBUTION_PERCENTAGE = 0.15;
const PERIOD_START = new Date(2017, 0, 1);
const PERIOD_END = new Date(2021, 5, 1);  // new Date(2021,5,1);
const RISK_PORTFOLIOS_MAP = {
    0: "Cautious",
    1: "Cautious",
    2: "Cautious",
    3: "Neutral",
    4: "Neutral",
    5: "Neutral",
    6: "Neutral",
    7: "Bold",
    8: "Bold",
    9: "Bold",
    10: "Bold",
}
const PORTFOLIOS = {
    "Cautious": [
        {
            "weight": 0.50,
            "ticker": "FLTR"
        }, {
            "weight": 0.35,
            "ticker": "SPY"
        }, {
            "weight": 0.05,
            "ticker": "FB"
        }, {
            "weight": 0.05,
            "ticker": "AAPL"
        }, {
            "weight": 0.05,
            "ticker": "AMZN"
        },
    ],
    "Neutral": [
        {
            "weight": 0.40,
            "ticker": "FLTR"
        }, {
            "weight": 0.30,
            "ticker": "SPY"
        }, {
            "weight": 0.10,
            "ticker": "FB"
        }, {
            "weight": 0.10,
            "ticker": "AAPL"
        }, {
            "weight": 0.10,
            "ticker": "AMZN"
        }
    ],
    "Bold": [
        {
            "weight": 0.30,
            "ticker": "FLTR"
        }, {
            "weight": 0.25,
            "ticker": "SPY"
        }, {
            "weight": 0.15,
            "ticker": "FB"
        }, {
            "weight": 0.15,
            "ticker": "AAPL"
        }, {
            "weight": 0.15,
            "ticker": "AMZN"
        }
    ],
};


const FORMAT_PRESENTATION = 'dd.MM.yyyy';
const FORMAT_FMT = 'yyyy-MM-dd';

class Portfolio {
    constructor(risk, income, contributionPercentage = CONTRIBUTION_PERCENTAGE) {
        this.risk = risk;
        this.income = income;
        this.contributionPercentage = contributionPercentage;
        this.monthlyInvestment = (income * contributionPercentage).toFixed(2);
        this.symbols = this.getSymbols();
        this.portfolio = this.getPortfolio();
    }

    getWeight(symbol) {
        const symbolData = this.portfolio.filter(element => element.ticker === symbol);

        return symbolData[0].weight;
    }

    getPortfolio() {
        const portfolio = PORTFOLIOS[RISK_PORTFOLIOS_MAP[this.risk]];
        console.log(portfolio)
        return portfolio;
    }

    getSymbols() {
        return this.getPortfolio().map(element => element.ticker);
    }

    async getProjection(periodStart = PERIOD_START, periodEnd = PERIOD_END) {
        const dailyClosePrices = await Fmp.fetchDailyClosePrices(periodStart, periodEnd, this.symbols);
        const investDates = Portfolio.getInvestDates(dailyClosePrices, periodStart, periodEnd);
        const purchases = this.getPurchases(investDates, dailyClosePrices);

        const performance = [];
        for (let numPeriod = 0; numPeriod < investDates.length; numPeriod++) {
            let date = investDates[numPeriod];

            const portfolioToDate = this.sumPortfolioToDate(purchases, date, dailyClosePrices);
            const contributions = (numPeriod + 1) * this.monthlyInvestment;
            const returns = portfolioToDate - contributions;

            performance.push({
                date: format(date, FORMAT_PRESENTATION),
                contributions: contributions.toFixed(2),
                portfolio: portfolioToDate.toFixed(2),
                returns: returns.toFixed(2),
            });
        }

        return {
            meta: {
                periodStart,
                periodEnd,
                risk: this.risk,
                income: this.income,
                contributionPercentage: this.contributionPercentage,
                monthlyInvestment: this.monthlyInvestment,
                symbols: this.symbols,
                portfolio: this.portfolio,
                portfolioAmount: performance.slice(-1)[0].portfolio,
                returns: performance.slice(-1)[0].returns,
                contributions: performance.slice(-1)[0].contributions,
            },
            performance
        };
    }

    sumPortfolioToDate(purchases, date, dailyClosePrices) {
        let upToDatePurchases = purchases.filter(purchase => isBefore(purchase.date, date) || isSameDay(purchase.date, date));

        const portfolioSum = upToDatePurchases.reduce((sum, purchase) => {
            const close = Portfolio.getClose(dailyClosePrices, date, purchase.symbol)

            sum += purchase.partialShares * close;

            return sum;
        }, 0);
        return portfolioSum;
    }

    getPurchases(investDates, dailyClose) {
        const purchases = [];

        for (const date of investDates) {
            this.symbols.forEach(symbol => {
                const weight = this.getWeight(symbol);
                const investSum = this.getInvestSum(weight);
                const close = Portfolio.getClose(dailyClose, date, symbol);
                const partialShares = investSum / close;

                purchases.push({
                    date,
                    symbol,
                    close,
                    partialShares
                })
            })
        }

        return purchases;
    }

    getInvestSum(weight) {
        return weight * this.monthlyInvestment;
    }

    static getClose(dailyClose, date, symbol) {
        return dailyClose.get(format(date, FORMAT_FMT))[symbol];
    }

    static getPortfolioByRisk(risk) {
        return PORTFOLIOS[RISK_PORTFOLIOS_MAP[risk]];
    }

    static getInvestDates(dailyClose = [], periodStart = PERIOD_START, periodEnd = PERIOD_END) {
        const investMonths = eachMonthOfInterval({
            start: periodStart,
            end: periodEnd,
        })
        const isMarketDay = dateObj => {
            const formattedDate = format(dateObj, FORMAT_FMT);

            return dailyClose.has(formattedDate);
        };

        return investMonths.reduce((investDates, date) => {
            while (!isMarketDay(date) && isBefore(date, periodEnd)) {
                date = add(date, {
                    days: 1,
                })
            }

            if (isMarketDay(date)) {
                investDates.push(date);
            }
            return investDates;
        }, []);
    }
}

export default Portfolio;
