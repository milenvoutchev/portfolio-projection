# Portfolio development projection

## Description

This is a personal project to help me get started investing in my own tailored portfolio. To this goal, I should input a few variables to understand my personal financial status and possibilities.

As such, I've built a simple questionnaire out of the questions below and then show which portfolio, would make sense to me based on the chosen risk tolerance.

Questionnaire Questions:

- What's your name?
- How much do you earn per month?
- What is your risk tolerance? 

Once the questionnaire is completed, there is a dashboard showing a graph of how the portfolio has developed between 1.1.2017 and 1.6.2021.

### Calculations Geek-out

Based on the risk tolerance one of three portfolio allocation strategies are chosen:

- Cautious: Bonds 50%, ETF 35%, [FAANG](https://www.investopedia.com/terms/f/faang-stocks.asp) stocks 15%
- Neutral: Bonds 40%, ETF 30%, [FAANG](https://www.investopedia.com/terms/f/faang-stocks.asp) stocks 30%
- Bold: Bonds 30%, ETF 25%, [FAANG](https://www.investopedia.com/terms/f/faang-stocks.asp) stocks 45%

The portfolio develops as follows:

- At the beginning of each month (the first day that the stock market is open), the given sum is always invested. The stocks bought are those in the portfolio, based on the supplied weighting.
- I assume that the first contribution took place on 3.1.2017 and the last contribution on 1.6.2021
- The close price is used as the purchase price of the partial share

The [https://financialmodelingprep.com/developer/docs/](https://financialmodelingprep.com/developer/docs/) API for historical stock data is being used.

---
## Installation

1. Clone repository
    ```shell
    git clone git@github.com:milenvoutchev/portfolio-projection.git
    ```
1. Set API key
    ```shell
    cp .env.dist .env
    ```
   And fill out in `.env` your personal API key (from https://financialmodelingprep.com/developer/docs/dashboard).
1. Install dependencies
    ```shell
    npm install
    ```
1. Build compiled assets & create dist folder
    ```shell
    npm run dev
    ```
1. Run locally
    ```shell
    npm run serve
    ```
1. Open in browser on http://localhost:5000/
