import Config from "./config";
import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 100 });
import IErc20Config from "/src/assets/abi/ierc20.json";
import Erc20Config from "/src/assets/abi/erc20.json";
const Configs = import.meta.glob("/src/assets/abi/config/*.json", {eager: true});
const Sources = import.meta.glob("/src/assets/abi/source/*.json", {eager: true});
import Web3 from "web3";

export class Web3Connector {
  chainList = [
    {
      name: "arbitrum",
      showname: "Arbitrum",
      chainid: [42161, 421613]
    },
    // {
    //   name: "bsc",
    //   showname: "BSC",
    // },
    // {
    //   name: "heco",
    //   showname: "Heco",
    // },
  ];

  chainIdx = 0;
  constructor() {
    let tmpidx = 0;
    if (isNaN(tmpidx)) {
      tmpidx = 0;
    }
    this.chainNameIdx = tmpidx;
    this.chainName = this.chainList[tmpidx].name;
    this.chainShowName = this.chainList[tmpidx].showname;
    this.config = Configs[`/src/assets/abi/config/${this.chainName}.json`];
    this.chainUrl = this.getConfig("chain");
    // this.web3 = new Web3(new Web3.providers.HttpProvider(this.chainUrl));
    this.web3 = null
    //存放智能合约
    this.contracts = {};
    this.contracts2 = {};
    this.tool = new RpcTools(this);
    this.mainReq = null;
    //当账号可用时的监听
    this.accountsChangedListeners = [];
    this.chainChangedListeners = [];
    this.onAccountConnectListener = [];
    this.handleAccountsChangedActived = false;
    this.listenerInit = false;
    console.log("Web3 object inited");
    // PPM 合约
    // this.PPM = null;
    // this.StakingReward = null;
    // this.contractObjInit();
  }

  web3ObjInit () {
    this.web3 = new Web3(window.ethereum);
    this.contractObjInit();
    console.log("Web3 object inited");
  }

  async doSign (test = {}) {
    console.log(JSON.stringify(test))
    console.log(this.web3.utils.sha3(JSON.stringify(test)))
    let res = await window.ethereum
      .request({
        method: "eth_sign",
        params: [this.account, this.web3.utils.sha3(JSON.stringify(test))],
      })
    // let res = await this.web3.eth.sign('12313123', this.account)
    console.log(res)
    return res
  }

  contractObjInit() {
    // this.PPM = new RpcPPMRequestor(this);
    // this.StakingReward = new RpcStakingRewardRequestor(this);
    this.mainReq = new RpcMainRequestor(this);
    this.mainReq.contractObjInit();
  }

  getChainId() {
    return this.getConfig("chainid");
  }

  async checkChainId () {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    return this.web3.utils.numberToHex(this.getConfig("chainid")) === chainId
  }

  async switchChain() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (this.web3.utils.numberToHex(this.getConfig("chainid")) !== chainId) {
      return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: this.web3.utils.numberToHex(this.getConfig("chainid")),
          },
        ],
      });
    } else {
      return true;
    }
  }

  addChain() {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: this.web3.utils.numberToHex(this.getConfig("chainid")),
          chainName: this.getConfig("name"),
          rpcUrls: [this.getConfig("chain")],
        },
      ],
    });
  }

  /**
   * 初始化链接
   */
  initConnection({ onConnect, onSpender }) {
    if (onConnect) {
      this.onConnect = onConnect;
    }
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(this.handleAccountsChanged.bind(this))
      .catch((error) => {
        if (this.onConnect) {
          this.onConnect(null, "Connection Failure");
        }
        if (error.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      })
      .then(async () => {
        //获取spender
        // let res = await this.mainReq.getDVoteAddress()
        // console.log('invoke getDVoteAddress get spender = >',res)
        // this.spender = res
        if (onSpender) {
          onSpender();
        }
      });

    if (!this.listenerInit) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("window.ethereum.on('accountsChanged'", accounts);
        this.handleAccountsChanged(accounts);
        if (this.accountsChangedListeners) {
          for (let i = 0; i < this.accountsChangedListeners.length; i++) {
            this.accountsChangedListeners[i](accounts);
          }
        }
      });
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("window.ethereum.on('chainChanged'", chainId);
        if (this.chainChangedListeners) {
          for (let i = 0; i < this.chainChangedListeners.length; i++) {
            this.chainChangedListeners[i](chainId);
          }
        }
      });
      this.listenerInit = true;
    }
  }

  getAddress(name) {
    let cont = this.config.scene[Config.isDebug ? "test" : "product"];
    if (cont.contracts[name]) {
      return cont.contracts[name].address;
    } else {
      console.error("配置文件中没有找到" + name + "的地址");
      return "";
    }
  }

  getConfig(type) {
    let cont = this.config.scene[Config.isDebug ? "test" : "product"];
    if (cont[type]) {
      return cont[type];
    } else {
      console.error("配置文件中没有找到" + type + "的配置");
      return "";
    }
  }

  getContract(name) {
    console.log(name)
    if (!(name in this.contracts)) {
      let contrs = this.getConfig("contracts");
      if (contrs[name]) {
        let address = contrs[name].address;
        let abi = Sources[`/src/assets/abi/source/${name}.json`].default;
        // console.log(Sources[`/src/assets/abi/source/${name}.json`].default)
        this.contracts[name] = this._genContract(abi, address);
      } else {
        console.error("没有找到对应的合约:", name);
        return null;
      }
    }
    return this.contracts[name];
  }

  /**
   * 可用账号临听
   * @param {} listener
   */
  addAccountUsableListener(listener) {
    this.onAccountConnectListener.push(listener);
  }
  /**
   * 处理账号变化的事件
   */
  handleAccountsChanged(accounts) {
    if (this.handleAccountsChangedActived) {
      return;
    }
    this.handleAccountsChangedActived = true;
    if (accounts && accounts.length > 0) {
      // console.log(accounts)
      // getAccounts获取到的是区分大小写，accounts则是全小写
      this.web3.eth.getAccounts().then((adds) => {
        // console.log(adds)
        // this.account = accounts[0];
        // this.account = '0x3A3c4e8ef7bc58b62a096D635a837d6255882a04';
        this.account = adds[0];
        this.chainId = window.ethereum.chainId;
        console.log(
          "handleAccountsChanged current Account =>>>>>>  ",
          this.account,
          "chain id = " + this.chainId
        );
        if (this.onConnect) {
          this.onConnect(this.account);
        }
      })
    }
    if (this.onAccountConnectListener) {
      for (let i = 0; i < this.onAccountConnectListener.length; i++) {
        this.onAccountConnectListener[i](this.account);
      }
    }
    setTimeout(() => {
      this.handleAccountsChangedActived = false;
    }, 100);
  }

  getHashSearchUrl() {
    return this.getConfig("hashurl");
  }

  /**
   * 检测hash上链情况
   * @param hash hash值
   * @param retryCount 尝试次数
   * @returns {Promise<any>}
   */
  checkHashStatus(hash, retryCount = 60) {
    console.log(
      "checkBlockStatusV2 hash = " + hash + ", retryCount = " + retryCount
    );
    const that = this;
    return new Promise((resolve) => {
      doCheck();
      async function doCheck() {
        if (retryCount < 0) {
          resolve({
            res: false,
            err: "Request TimeOut",
          });
        } else {
          let trans = await that.web3.eth.getTransactionReceipt(hash);
          //上链成功
          console.log("上链状态======>", trans);
          if (trans) {
            if (trans.blockHash && trans.blockNumber > 0 && trans.status) {
              resolve({
                res: true,
                data: {
                  hash,
                  trans,
                },
              });
            } else {
              resolve({
                res: false,
                err: "Transaction Failure",
              });
            }
          // } else if (retryCount <= 1780) {
          //   resolve({
          //     res: true,
          //     data: {
          //       hash,
          //       trans,
          //     },
          //   });
          } else {
            setTimeout(() => {
              retryCount--;
              doCheck();
            }, 1000);
          }
        }
      }
    });
  }

  _genContract(abi, address) {
    return new this.web3.eth.Contract(abi, address);
  }
}

class RpcMainRequestor {
  constructor(rpc) {
    this.rpc = rpc;
    // this.contractTdex = null;
    this.tool = new RpcTools(rpc);
  }

  contractObjInit() {
    this.contractTTStaking = this.rpc.getContract('ttstaking')
    this.contractBgtStaking = this.rpc.getContract('bgtstaking')
    this.contractVe = this.rpc.getContract("theve");
    this.contractTTPoint = this.rpc.getContract('ttpoint')
    this.contractBGTPoint = this.rpc.getContract('bgtpoint')
    this.contractVeTT = this.rpc.getContract('vett')
  }

  async getTokenBalance (token) {
    let tokenObj = await this.checkAndInitContractObj2(token);
    let account = this.rpc.account;
    return tokenObj.methods.balanceOf(account).call();
  }

  checkVettApprove (address) {
    let account = this.rpc.account
    return this.contractVeTT.methods.isApprovedForAll(account, address).call()
  }

  vettApproveToContract (sender) {
    let address = this.rpc.getAddress('vett')
    let sendAbi = this.contractVeTT.methods.setApprovalForAll(
      sender,
      true
    ).encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "setApprovalForAll");
  }

  getUserInfos () {
    let account = this.rpc.account
    return this.contractVe.methods.getUserInfo(account).call();
  }

  getApproveWithToken (token, spender) {
    let contract = this.checkAndInitContractObj(token);
    return contract.methods.allowance(this.rpc.account, spender).call();
  }

  allowanceWithToken (token, spender, amount) {
    let contract = this.checkAndInitContractObj(token);
    let sendAbi = contract.methods.approve(spender, amount).encodeABI();
    return this.tool._writeOprationV3(sendAbi, token, "approve");
  }

  getTTPoint () {
    let account = this.rpc.account;
    return this.contractTTPoint.methods.points(account).call()
  }
  getBGTPoint () {
    let account = this.rpc.account;
    return this.contractBGTPoint.methods.points(account).call()
  }

  exchangeTTPoint () {
    let address = this.rpc.getAddress("ttpoint");
    // console.log(orderlist)
    let sendAbi = this.contractTTPoint.methods.exchange().encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "doExchangeTTpoint");
  }

  exchangeBGTPoint () {
    let address = this.rpc.getAddress("bgtpoint");
    // console.log(orderlist)
    let sendAbi = this.contractBGTPoint.methods.exchange().encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "doExchangeBGTpoint");
  }

  async getTTDecimals () {
    return await this.getTokenDecimal(this.rpc.getAddress('tt'))
  }
  async getUSDTDecimals () {
    return await this.getTokenDecimal(this.rpc.getAddress('usdt'))
  }
  async getBGTDecimals () {
    return await this.getTokenDecimal(this.rpc.getAddress('bgt'))
  }

  async getTokenDecimal(token) {
    if (token.toLowerCase() === Config.ethUrl.toLowerCase()) {
      return 18;
    }
    let tokenObj = await this.checkAndInitContractObj2(token);
    // console.log(this.contractTdex.methods)
    return tokenObj.methods.decimals().call();
  }

  getTTPoolInfos () {
    let account = this.rpc.account;
    // let account = '0x6F13E6D2f128180AfC15c34e6a5Dc36EE5A5F479'
    return this.contractTTStaking.methods.getUserInfo(account).call()
  }
  getTTUserIncome () {
    let account = this.rpc.account;
    return this.contractTTStaking.methods.getInterest(account).call()
  }

  doExitTTStaking (amount) {
    let address = this.rpc.getAddress("ttstaking");
    let sendAbi = this.contractTTStaking.methods.withdrawTT(amount).encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "exitTTStaking");
  }

  doGetTTIncome () {
    let address = this.rpc.getAddress("ttstaking");
    let sendAbi = this.contractTTStaking.methods.claimInterestTT().encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "claimInterestTT");
  }

  getVeVoteUserInfos () {
    let account = this.rpc.account
    return this.contractVe.methods.getUserInfo(account).call();
  }

  getVeVoteIncoms (orderlist) {
    return this.contractVe.methods.getInterestBatch(orderlist).call();
  }

  doExitVeVoteStaking (orderlist) {
    let address = this.rpc.getAddress("theve");
    // console.log(orderlist)
    let sendAbi = this.contractVe.methods.unlockAndWithdrawTTBatch(orderlist).encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "doExitVeVote");
  }

  doGetVeVoteIncome (orderlist) {
    let address = this.rpc.getAddress("theve");
    let sendAbi = this.contractVe.methods.claimInterestTTBatch(orderlist).encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "doGetVeVoteIncome");
  }

  getBgtPoolInfos () {
    let account = this.rpc.account;
    // let account = '0x6F13E6D2f128180AfC15c34e6a5Dc36EE5A5F479'
    return this.contractBgtStaking.methods.getUserInfo(account).call()
  }

  getBGTUserIncome () {
    let account = this.rpc.account;
    return this.contractBgtStaking.methods.getInterest(account).call()
  }

  doExitBGTStaking (amount) {
    let address = this.rpc.getAddress("bgtstaking");
    let sendAbi = this.contractBgtStaking.methods.withdraw(amount).encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "exitBGTStaking");
  }

  doGetBGTIncome () {
    let address = this.rpc.getAddress("bgtstaking");
    let sendAbi = this.contractBgtStaking.methods.claimInterest().encodeABI();
    return this.tool._writeOprationV3(sendAbi, address, "claimInterestBGT");
  }

  checkAndInitContractObj(token) {
    if (this.rpc.contracts[token]) {
      return this.rpc.contracts[token];
    } else {
      // let contract = null
      let abi = IErc20Config;
      let contra = this.rpc._genContract(abi, token);
      this.rpc.contracts[token] = contra;
      return contra;
      // this.rpc._getContractWithAddress(token).then(res => {
      //   contract = res
      //   this.rpc.contracts[token] = contract
      //   resolve(contract)
      // })
    }
  }

  checkAndInitContractObj2(token) {
    if (this.rpc.contracts2[token]) {
      return this.rpc.contracts2[token];
    } else {
      // let contract = null
      let abi = Erc20Config;
      let contra = this.rpc._genContract(abi, token);
      this.rpc.contracts2[token] = contra;
      return contra;
      // this.rpc._getContractWithAddress(token).then(res => {
      //   contract = res
      //   this.rpc.contracts[token] = contract
      //   resolve(contract)
      // })
    }
  }
}

class RpcTools {
  constructor(rpc) {
    this.rpc = rpc;
  }

  _sleep(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  _getHashInfo(hash) {
    return new Promise((resolve) => {
      window.ethereum
        .request({
          method: "eth_getTransactionByHash",
          params: [hash],
        })
        .then((data) => {
          resolve({
            res: true,
            data,
          });
        })
        .catch((e) => {
          resolve({
            res: false,
            data: e,
          });
        });
    });
  }

  async getGasPrice () {
    let gasp = '5';
    switch (this.rpc.chainName) {
      case 'bsc':
        gasp = this.rpc.web3.utils.toWei('5', 'gwei')
        break;
      case 'heco':
        gasp = this.rpc.web3.utils.toWei('2.25', 'gwei')
        break;
      case 'polygon':
        try {
          gasp = await this.rpc.web3.eth.getGasPrice()

          gasp = new BigNumber(gasp).times(1.1)
          if (gasp.lt(new BigNumber(50 * 1e9))) {
            gasp = new BigNumber(50 * 1e9).toFixed(0).toString()
          } else {
            gasp = gasp.toFixed(0).toString()
          }
        } catch (e) {
          console.log(e)
          gasp = this.rpc.web3.utils.toWei('100', 'gwei')
        }
        break;
    }
    return gasp
  }

  _writeOprationV3(methodEncode, abiaddresss, methodName, amount = 0) {
    return new Promise((resolve) => {
      this.getGasPrice().then(gas => {
        console.log(gas)
        console.log(
          "准备执行写方法v3 =====> " +
          methodName +
          ", abiAdress ==> " +
          abiaddresss
        );
        let param = {
          to: abiaddresss,
          from: this.rpc.account,
          data: methodEncode,
          // chainId: this.rpc.chainId,
          // value: "0x" + new BigNumber(amount).toString(16),
          // gasPrice: this.rpc.web3.utils.toHex(gas),
          methodName
          // gas: this.rpc.web3.utils.toHex('8000000'),
          // maxPriorityFeePerGas: this.rpc.web3.utils.toWei('50', 'gwei'),
          // maxFeePerGas: this.rpc.web3.utils.toWei('200', 'gwei'),
        };
        param.metaTrans = true

        if (amount !== 0) {
          param.value = "0x" + new BigNumber(amount).toString(16);
        }
        console.log(param);
        window.ethereum
          .request({
            method: "eth_sendTransaction",
            params: [param],
          })
          .then((data) => {
            console.log(methodName + " 结果hash = " + data);
            resolve({
              res: true,
              data,
            });
            // //检测上链状态
            // return this._checkBlockStatusV2(data, 10, methodName)
          })
          .catch((err) => {
            console.log("writeOpration err = > ", err);
            if (err.code === 4001) {
              //用户取消
              resolve({
                res: false,
                err: "User denied transaction",
              });
            } else {
              //操作失败
              resolve({
                res: false,
                err: "Opration Failure",
              });
            }
          });
      })
    });
  }
}
