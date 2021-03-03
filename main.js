const client = require('./api/index');
const config = require('./config/config');
const logFn = require('./fn/log_token');
const  sendFn = require('./fn/send_fn');
const monitorPairCreatedList = require('./fn/monitor_pair_created')
global._cli = new client(config);



async function main() {
    await _cli.init();
    global.web3 = _cli.web3;
    logFn();
    monitorPairCreatedList();

}


main();
