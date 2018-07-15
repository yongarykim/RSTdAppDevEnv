import BaseContract from './BaseContract';

export default class DTUToken extends BaseContract {

    
    transfer = (to, value) => {
        let DTUTokenInstance;

        console.log('DTUToken.transfer:' + to +',' + value);
        console.log(this.web3);
        let self = this;
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            }

            let account = accounts[0]; //본인 account
            self.contract.deployed().then((instance) => {
                DTUTokenInstance = instance;

                return DTUTokenInstance.transfer(to, value, {from:account});  //from 옵션넣어줘야 동작하네요.

            }).then((result) => {
                console.log('transfer Result:'); console.log(result);
                return result; //maybe bool
            }).catch((err) => {
                console.log('transfer Error:'); console.log(err);
            });
        });
    }

}