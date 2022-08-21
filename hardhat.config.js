require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // by default yhi hota hai
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
      gas: 6000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts already provided by hardhat
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
