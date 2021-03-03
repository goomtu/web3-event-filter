
const Web3 = require('web3');


const USERSTABNAME = 'users';
const PRODUCTTABNAME = 'product';

class Client {
    constructor(
        config
    ) {
        this.config = config;
    }

    async init() {
       
        this.web3 = new Web3(this.config.provider);
    }

}


module.exports = Client;
