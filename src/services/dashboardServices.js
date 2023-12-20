let EthereumBroker = require("../brokers/ethereumBroker")

class DashboardServices {
  static getDefaultInfo() {
    return {
      transaction: [],
      fiat: "96.54",
      ethereum: "2.189246091124",
      error: ""
    }
  }

  static createWallet() {
    let ethereumBroker = new EthereumBroker();
    return ethereumBroker.createWallet();
  }
}

module.exports = DashboardServices;
