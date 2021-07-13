const RISK_PORTFOLIOS_MAP = {
    0: "2",
    1: "2",
    2: "2",
    3: "4",
    4: "4",
    5: "6",
    6: "6",
    7: "8",
    8: "8",
    9: "10",
    10: "10",
}
const PORTFOLIOS = {
    "2": [{
        "weight": 0.20,
        "ticker": "CAKE"
    },{
        "weight": 0.50,
        "ticker": "PZZA"
    },{
        "weight": 0.30,
        "ticker": "EAT"
    }],
    "4": [{
        "weight": 0.40,
        "ticker": "CAKE"
    },{
        "weight": 0.35,
        "ticker": "PZZA"
    },{
        "weight": 0.25,
        "ticker": "EAT"
    }],
    "6": [{
        "weight": 0.65,
        "ticker": "CAKE"
    },{
        "weight": 0.20,
        "ticker": "PZZA"
    },{
        "weight": 0.15,
        "ticker": "EAT"
    }],
    "8": [{
        "weight": 0.80,
        "ticker": "CAKE"
    },{
        "weight": 0.10,
        "ticker": "PZZA"
    },{
        "weight": 0.10,
        "ticker": "EAT"
    }],
    "10": [{
        "weight": 1,
        "ticker": "CAKE"
    },{
        "weight": 0,
        "ticker": "PZZA"
    },{
        "weight": 0,
        "ticker": "EAT"
    }]
};

class Portfolio {
    getPortfolioByRiskAllocation(allocation) {
        return PORTFOLIOS[RISK_PORTFOLIOS_MAP[allocation]];
    }
}

export default Portfolio;
