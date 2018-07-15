import BaseContract from './BaseContract';

export default class TourProductBuy extends BaseContract {

    isHistoryExist = (productId) => {
        let TourProductBuyInstance;
        console.log('in isHistoryExist');

        return this.contractDeployed().then((instance) => {
            TourProductBuyInstance = instance;
            return TourProductBuyInstance.isHistoryExist.call(productId);

        }).then((value) => {
            console.log('return isHistoryExist:' + value);
            return value;

        }).catch((err) => {
            console.log(err.message);
        });
    }

    buyProduct = (id, price) => {
        let TourProductBuyInstance;

        console.log('TourProductBuy.buyProduct:' + id +',' + price);

        let self = this;
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            }

            let account = accounts[0]; //본인 account
            self.contract.deployed().then((instance) => {
                TourProductBuyInstance = instance;

                return TourProductBuyInstance.buyProduct(id, price, {from:account});  //from 옵션넣어줘야 동작하네요.

            }).then((result) => {
                console.log('buyProduct Result:'); console.log(result);
                return result; //maybe bool
            }).catch((err) => {
                console.log('buyProduct Error:'); console.log(err);
            });
        });
    }

}