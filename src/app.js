import Fmp from "./service/Fmp";

(async function(){
    console.log(await Fmp.fetchHistoricPrices());
})();
