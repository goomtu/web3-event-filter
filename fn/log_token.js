const {getAddress, toAddress} = require('../utils/does_it_exist');
const abi = require('../config/token.json');
const {toeknList, logBlock, fromBlock} = require('../config/config')
const notice = require('./send_fn');

module.exports = () => {
    web3.eth.subscribe('logs', {
        fromBlock: logBlock || fromBlock,
        topics: ["0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"]
    }, function (error, result) {
        if (error)
            console.log(error, 'errrr');
    })
        .on("connected", console.log)
        .on("data", sendFn)
        .on("changed", console.log);
}


const sendFn = async (log) => {
    let _from = getAddress(log.topics[1])
    let _contractAddr = toAddress(log.address);
    if (_from == 0) {
        try {

            let _contract = new web3.eth.Contract(abi.abi, _contractAddr);
            let _symbol = await _contract.methods.symbol().call();
            let _name = await _contract.methods.name().call();
            let _str = (_name + ' ' + _symbol).toLowerCase();
            let _newToken
            for (let i = 0; i < toeknList.length; i++) {
                let _key = toeknList[i].toLowerCase();
                if (_str.indexOf(_key) > -1) {
                    _newToken = true;
                    break;
                }
            }

            if (!_newToken) return;

            noticeFn(_name, _symbol);
        } catch (e) {
            console.log('非token合约');
        }

    }
}

/**
 *
 * @param name
 * @param symbol
 */
function noticeFn(name, symbol) {
    let requestData = {
        'msgtype': 'markdown',
        'markdown': {
            'content': `
            <font color="#3498db">监听新token发布</font>
            >name: <font color="warning">${name}</font>
            >symbol: <font color="warning">${symbol}</font>`
        },
    };
    notice(requestData);
}
