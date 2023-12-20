const web3 = require("web3");
const { ethers} = require("hardhat");
const { NFTStorage, File } = require("nft.storage");
const fs = require('fs');
require('dotenv').config();
const { NFT_API_KEY } = process.env;

class EthereumBroker {
  async createWallet() {
    try {
      const account = await web3.eth.accounts.create();
      return {
        privateKey: account.privateKey,
        publicAddress: account.address
      };
    } catch (error) {
      console.error('Error generating new Ethereum wallet:', error.message);
      return {error: "Unable to create wallet."};
    }
  }

  async upload() {
    const client = new NFTStorage({token: NFT_API_KEY});
    const metadata = await client.store({
      name: 'Meet Pistache',
      description: 'Meet Pistache, 4 years old.',
      image: new File(
        [await fs.promises.readFile("assets/meet-pistache.jpg")],
        'Meet-Pistache',
        {type: 'image/jpg'}
      )
    });
    console.log("METADATA: ", metadata.url);
    return metadata.url;
  }

  async deployContact() {
    const nftContract = await ethers.getContractFactory("TazNFT");
    const nft = await nftContract.deploy("0x14149029C850D33Cce7f6e0536534a3ec03bBbd0");
    await nft.deployed(); // CREATE2
    const txHash = nft.deployTransaction.hash;
    const txReceipt = await ethers.provider.waitForTransaction(txHash);
    const contractAddress = txReceipt.contractAddress;
    console.log("Contract deploy to address: " + contractAddress);
  }

  async mintNFT(contractAddress, metaDataURL) {
    const nft = await ethers.getContractFactory("TazNFT");
    const [owner] = await ethers.getSigners();
    await nft.attach(contractAddress).mintNFT(owner.address, metaDataURL);
    console.log("NFT Minted to: " + owner.address);
  }

  tt(){
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  }

  async getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }

  async signMessage(account, message) {
    return await ethereum.request({
      method: 'personal_sign',
      params: [message, account],
    });
  }


}

module.exports = EthereumBroker;