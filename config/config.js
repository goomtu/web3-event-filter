const Config = {
    provider: "wss://",
    tokenList:['NsUre'],
    fromBlock:11964761, // 默认为最新 null
    logBlock:11964761,
    pairCreatedBlock:null,
    monitorPairCreatedList:[
        '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
        '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ],
    weChatUrl:"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key="
};


module.exports  = Config;
