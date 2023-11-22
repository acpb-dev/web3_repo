/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "PolygonMain",
  networks: {
    PolygonMain:{
      url: "https://polygon-rpc.com/",
      accounts:[PRIVATE_KEY]
    },
    PolygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts:[PRIVATE_KEY]
    }
  }
};
