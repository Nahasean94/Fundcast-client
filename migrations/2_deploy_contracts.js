var PublicRecords = artifacts.require("./PublicRecords.sol");

module.exports = function(deployer) {
  deployer.deploy(PublicRecords);
};
