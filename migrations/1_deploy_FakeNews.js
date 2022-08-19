const FakeNewsApp = artifacts.require("FakeNewsApp");

module.exports = function (deployer) {
  deployer.deploy(FakeNewsApp);
};
