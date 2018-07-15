import BaseContract from './BaseContract';

class SimpleStorage extends BaseContract {

    //get함수는 Promise임 : 사용시 .then()으로 호출
    getValue = () => { //adopters, account) {
        let simpleStorageInstance;

        //promise를 리턴
        return this.contract.deployed().then((instance) => {
            simpleStorageInstance = instance;
            //console.log(this.web3.version.api);
            return simpleStorageInstance.getValue.call();

        }).then((value) => {
            console.log(value.toNumber());
            return value.toNumber(); //BigNumber를 Number로 변환필요

        }).catch((err) => {
            console.log(err.message);
        });
    }

    setValue = (value) => {
        let simpleStorageInstance;
        //web3.version.api

        console.log('SimpleStorageContract.setValue:' + value);
        console.log(this.web3);
        let self = this;
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            }
            let account = accounts[0];
            self.contract.deployed().then((instance) => {
                simpleStorageInstance = instance;

                return simpleStorageInstance.setValue(value, {from: account});

            }).then((result) => {
                return self.getValue(); //no need

            }).catch((err) => {
                console.log(err.message);
            });
        });
    }

} //class

export default SimpleStorage;
