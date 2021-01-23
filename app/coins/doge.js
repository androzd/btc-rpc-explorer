var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"DOGE",
		multiplier:1,
		default:true,
		values:["", "doge", "DOGE"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mDOGE",
		multiplier:1000,
		values:["mdoge"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Doge",
	ticker:"DOGE",
	logoUrl:"/img/logo/doge.svg",
	siteTitle:"Doge Explorer",
	siteDescriptionHtml:"<b>DOGE Explorer</b> is <a href='https://github.com/janoside/btc-rpc-explorer). If you run your own [Bitcoin Full Node](https://bitcoin.org/en/full-node), **BTC Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://github.com/janoside/btc-rpc-explorer) for a list of features and instructions for running.",
	nodeTitle:"Doge Full Node",
	nodeUrl:"https://dogecoin.org/en/full-node",
	demoSiteUrl: "https://doge.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"DOGE":currencyUnits[0], "mdoge":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	historicalData: [

	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Dogecoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}

			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(10000) ];
		for (var i = 1; i < 34; i++) {
			eras.push(new Decimal8(10000));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};