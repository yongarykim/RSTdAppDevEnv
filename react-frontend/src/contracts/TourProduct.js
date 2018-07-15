import BaseContract from './BaseContract';

export default class TourProduct extends BaseContract {

    getSize = () => {
        let TourProductInstance;
        console.log('in getSize');

        //promise를 리턴
        return this.contractDeployed().then((instance) => {
            TourProductInstance = instance;
            return TourProductInstance.getSize.call();

        }).then((value) => {
            console.log(value.toNumber());
            return value.toNumber();

        }).catch((err) => {
            console.log(err.message);
        });
    }

    getProduct = (id) => {
        let TourProductInstance;

        //promise를 리턴
        return this.contractDeployed().then((instance) => {
            TourProductInstance = instance;
            return TourProductInstance.getProduct.call(id);

        }).then((multiReturnValue) => {
            //returnedValue: "id,name,price" 형태의 string으로 옴.
            let [id, name, price, agent, detail] = multiReturnValue; //multiReturnValue 분할.
            console.log('in getProduct, id:' + id);
            let product = { id:id.toNumber(),
                            name:this.web3.toAscii(name),
                            price:price.toNumber(),
                            agent:this.web3.toAscii(agent),
                            detail:this.web3.toAscii(detail)
                           };
            console.log(product);
            return JSON.stringify(product);

        }).catch((err) => {
            console.log(err.message);
        });
    }

    insertProduct = (name, price, agent, detail) => {
        let TourProductInstance;

        console.log('TourProduct.insertProduct:' + name +',' + price);
        console.log(this.web3);
        let self = this;
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            }

            let account = accounts[0]; //본인 account
            self.contract.deployed().then((instance) => {
                TourProductInstance = instance;

                return TourProductInstance.insertProduct(name, price, agent, detail, {from:account});  //from 옵션넣어줘야 동작하네요.

            }).then((result) => {
                console.log('transfer Result:'); console.log(result);
                return result; //maybe bool
            }).catch((err) => {
                console.log('transfer Error:'); console.log(err);
            });
        });
    }

}