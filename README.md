# web3-event-filter
web3事件监控等工具集

## 运行
```
1: 安装依赖 yarn
2: 运行 yarn start
```


## 配置文件 路径:config/config.js
```angular2html
provider 需为ws链接
fromBlock 从那个最后那个快开始 当 logBlock/pairCreatedBlock 为空时默认采用
weChatUrl 机器人URL
monitorPairCreatedList PairCreated事件监听列表
toeknList 新token部署监听列表
```
