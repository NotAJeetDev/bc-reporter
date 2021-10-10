const {getQuery, getDeposits, getTransactions, checkContractKnown, getTransfers} = require("./helpers")
const {suspiciousWallets, tokens} = require("./config")
const fs = require("fs")



const init = async () => {

    var i = 0
    while (i < suspiciousWallets.length) {

        var output = {}
        console.log(`Deposits for ${suspiciousWallets[i]}`)
        output.address = suspiciousWallets[i]

        let query = getQuery(suspiciousWallets[i], "transactions")
        let deposits = await getDeposits(query)
        let transactions = await getTransactions(query)
        let transfers = await getTransfers(query)

   
        var outputData = []
        var depositId = 0
        while(depositId < deposits.length) {
            var tx = deposits[depositId]
            var formatted = {
                from: tx.from,
                to: checkContractKnown(tx.to, "masterchef"),
                txHash: tx.hash,
                block: tx.blockNumber,
                date: (new Date(parseInt(tx.timeStamp) *1000).toISOString()),
                txError: tx.isError
            } 

            //console.log(formatted)
            
            outputData.push(formatted)
            output.deposits = outputData
            depositId ++
        }

        console.log(`Transfers for ${suspiciousWallets[i]}`)
        var transferId = 0
        var outputData = []

        while(transferId < transfers.length) {
            var tx = transfers[transferId]
            console.log(tx)

            var formatted = {
                from: tx.from,
                to: tx.to,
                txHash: tx.hash,
                block: tx.blockNumber,
                date: (new Date(parseInt(tx.timeStamp) *1000).toISOString()),
                txError: tx.isError,
            } 

            outputData.push(formatted)
            output.transfers = outputData
            transferId ++
        }

        console.log(`Transactions of known tokens for ${suspiciousWallets[i]}`)
        var transactionId = 0
        var outputData = []
        while(transactionId < transactions.length) {
            var tx = transactions[transactionId]
            
            for (let key in tokens) {
                var address = tokens[key]

                var knownAddress = null
                if (tx.input.includes(address.toLowerCase().substring(2))) {
    
                    knownAddress = checkContractKnown(address, "token")
                }

                var formatted = {
                    from: tx.from,
                    to: tx.to,
                    txHash: tx.hash,
                    block: tx.blockNumber,
                    date: (new Date(parseInt(tx.timeStamp) *1000).toISOString()),
                    txError: tx.isError,
                    tokenAddressKnown: knownAddress,
                }    
                //if (tokens[key].indexOf(address) !== -1) {
                //   name = `${address} (${key})`;
                //} 
                //console.log(formatted)
                outputData.push(formatted)
                output.transactions = outputData
             }; 

            transactionId ++ 
        }
        //console.log(output)
        fs.writeFileSync(`./output/${suspiciousWallets[i]}.json`, JSON.stringify(output));
        i++
    }

} 




init()