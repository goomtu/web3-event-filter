const InputDataDecoder = require('ethereum-input-data-decoder');
module.exports = {
    getAddress:(address) => getAddress(address),
    toAddress:(address) => toAddress(address),
}

const  getAddress =  (address) => {
    return web3.utils.padLeft(address.toLowerCase(), 64);
};

const toAddress =  (address) => {
    let _address = web3.utils.numberToHex(address.toLowerCase());
    _address = web3.utils.padLeft(_address,40)
    _address = web3.utils.toChecksumAddress(_address);
    return  _address;
};
