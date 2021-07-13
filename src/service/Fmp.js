import axios from "axios";
import { format } from "date-fns";

const SYMBOLS = ['CAKE','PZZA','EAT'];
const PERIOD_START = new Date(2017,1,1);
const PERIOD_END = new Date(2017,1,4);  // new Date(2021,6,1);

class Fmp {
    constructor() {
        this.get = axios.get;
        this.post = axios.post;

        if (!process.env.MIX_FMP_KEY) {

            return console.warn('Http initializing without token.');
        }

        this.token = process.env.MIX_FMP_KEY;
    }

    async fetchHistoricPrices(symbols = SYMBOLS, periodStart = PERIOD_START, periodEnd = PERIOD_END) {
        if (typeof symbols === 'string') {
            symbols = [symbols];
        }

        const startStr = format(new Date(periodStart), 'yyyy-MM-dd');
        const endStr = format(new Date(periodEnd), 'yyyy-MM-dd');

        const requestUri = `https://financialmodelingprep.com/api/v3/historical-price-full/${SYMBOLS.toString()}?from=${startStr}&to=${endStr}&apikey=${this.token}`;

        const response = await this.get(requestUri);

        return response.data;
    }
}

export default new Fmp();
