const depositHash = "0xe2bbb158"
let request = require('superagent');
const ethers = require("ethers")
const {hashes, chain, masterchefContracts, tokens} = require("./config")



function getQuery(address, type) {
    switch (type) {
        case "transactions":
            return "https://blockscout.moonriver.moonbeam.network/api/?module=account&action=txlist&address=" + address;
        case "abi":
            return "https://blockscout.moonriver.moonbeam.network/api?module=contract&action=getabi&address=" + address;
        case "transactionInfo": 
            return "https://blockscout.moonriver.moonbeam.network/api?module=transaction&action=gettxinfo&txhash=" + address;
        }
    }

async function getDeposits(query) {
    try {
        let data = await request.get(query);
        let deposits = [];
        let dataObj = JSON.parse(data.text).result;


        for (let tx of dataObj) {
            if (tx.input.includes(hashes.deposit)) {
                deposits.push(tx)
            }
        }
        return deposits
    }
    catch (e) {
        throw e;
    }
}

async function getTransfers(query) {
    try {
        let data = await request.get(query);
        let deposits = [];
        let dataObj = JSON.parse(data.text).result;


        for (let tx of dataObj) {
            if (tx.input.includes(hashes.transfers)) {
                deposits.push(tx)
            }
        }
        return deposits
    }
    catch (e) {
        throw e;
    }
}

async function getTransactions(query) {
    try {
        let data = await request.get(query)
        let txs = [];
        let dataObj = JSON.parse(data.text).result;

        for (let tx of dataObj) {
            if (tx.input.includes(hashes.swapExactTokensForTokens) || (tx.input.includes(hashes.swapExactTokensForETH)))
                txs.push(tx)
        }

        return txs
    }
    catch (e) {
        throw e
    }
}

function checkContractKnown(address, type) {
    let name = address
    
    switch (type) {
        case "masterchef":
            {
                for (let key in masterchefContracts) {
                    if (masterchefContracts[key].indexOf(address) !== -1) {
                       name = `${address} (${key.toUpperCase()})`;
                    } 
                 };
            }
        case "token":
            {
                for (let key in tokens) {
                    if (tokens[key].indexOf(address) !== -1) {
                       name = `${address} (${key.toUpperCase()})`;
                    } 
                 }; 
            }
    }

    // for (let key in masterchefContracts) {
    //     if (masterchefContracts[key].indexOf(address) !== -1) {
    //        name = `${address} (${key})`;
    //     } 
    //  };
     return name
}

function checkTokenKnown() {

}


module.exports = {
    getQuery,
    getDeposits,
    getTransactions,
    checkContractKnown,
    getTransfers
}