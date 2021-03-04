const {getAddress, toAddress} = require('../utils/does_it_exist');
const {fromBlock, monitorPairCreatedList, pairCreatedBlock} = require('../config/config')
const notice = require('./send_fn');
const abi = require('../config/token.json');

module.exports = () => {
    factory_list = ['0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'];

    web3.eth.subscribe('logs', {
        fromBlock: pairCreatedBlock||fromBlock,
        topics: ["0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9"],
        address: factory_list,
    }, function (error, result) {
        if (error)
            console.log(error, 'errrr');
    })
        .on("connected", () => console.log("run monitor_pair success"))
        .on("data", sendFn)
        .on("changed", console.log);
}


const sendFn = async (log) => {
    let _from =  toAddress(log.topics[1])
    let _to = toAddress(log.topics[2]);

    let _str = (_from + _to).toLowerCase();

    let findFlag = false;
    for (let i = 0; i < monitorPairCreatedList.length; i++) {
        if(_str.indexOf(monitorPairCreatedList[i].toLowerCase()) > -1){
            findFlag = true;
            break;
        }
    }

    if(findFlag == false) {
        return
    }

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
            >Token0: <font color="warning">${_symbolFrom}</font>
            >Token1: <font color="warning">${_symbolTo}</font>
            >Link: <font color="warning">[Detail](${url})</font> 
`
        },
    };
    
    notice(requestData);
}


