const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying Contract");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  verify,
};
