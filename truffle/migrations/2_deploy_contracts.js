const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const DTUToken = artifacts.require("./DTUToken.sol");
const TourProduct = artifacts.require("./TourProduct.sol");
const TourProductBuy = artifacts.require("./TourProductBuy.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(DTUToken).then(() => {
        deployer.deploy(TourProduct).then(() => {
            deployer.deploy(TourProductBuy, DTUToken.address, TourProduct.address)
        })
    })
};
