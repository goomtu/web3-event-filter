const {getAddress, toAddress} = require('../utils/does_it_exist');
const {fromBlock, monitorPairCreatedList,pairCreatedBlock} = require('../config/config')
const notice = require('./send_fn');
const abi = require('../config/token.json');

module.exports = () => {
    web3.eth.subscribe('logs', {
        fromBlock:pairCreatedBlock||fromBlock,
        topics: ["0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9"],
        address: monitorPairCreatedList,
    }, function (error, result) {
        if (error)
            console.log(error, 'errrr');
    })
        .on("connected", console.log)
        .on("data", sendFn)
        .on("changed", console.log);
}


const sendFn = async (log) => {
    let _from =  toAddress(log.topics[1])
    let _to = toAddress(log.topics[2]);


    let url = 'https://cn.etherscan.com/tx/'+log.transactionHash;
    let _contractFrom = new web3.eth.Contract(abi.abi, _from);
    let _contractTo = new web3.eth.Contract(abi.abi, _to);

    let _symbolFrom = await _contractFrom.methods.symbol().call();
    let _symbolTo = await _contractTo.methods.symbol().call();


    let requestData = {
        'msgtype': 'markdown',
        'markdown': {
            'content': `
            <font color="#3498db">新PairCreated事件</font>
            >from: <font color="warning">${_symbolFrom}</font>
            >to: <font color="warning">${_symbolTo}</font>
            >Url: <font color="warning">[Detail](${url})</font> 
`
        },
    };
    notice(requestData);

}


