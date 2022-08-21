const {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentChains.includes(network.name)) {
    // if(chainId == "31337") // but then const ChainId required
    log("Local network detected! Deploying mocks...");
    try {
      await deploy("MockV3Aggregator", {
        from: deployer,
        log: true,
        args: [DECIMALS, INITIAL_ANSWER],
      });
      log("Mocks deployed");
      log("---------------01-deploy-mocks----ENDS--------------------------");
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports.tags = ["all", "mocks"];
