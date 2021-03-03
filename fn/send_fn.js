const {weChatUrl} = require('../config/config');
const request = require('request');

module.exports = (requestData) => {




    request({
        url: weChatUrl,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });

}




