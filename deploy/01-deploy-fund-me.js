// // hre => hardhat runtime environment
// function deployFunc(hre) {
//   console.log("hi");
//   hre.getNamedAccounts
//   hre.deployments
// }
// module.exports.default = deployFunc;

const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

// module.exports = async (hre) => {
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;
  // if the contract doesn't exist, we deploy a minimal version
  // for our local testing
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdPriceAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdPriceAggregator.address;
  } else {
    log("Executing for Testnet or Real chains");
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // what happens when we want to change chains?
  // when going for localhost or hardhat network, we want to use mock
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, // put price feed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }

  log("---------------01-deploy-fund-me----ENDS--------------------------");
};

module.exports.tags = ["all", "fundme"];
