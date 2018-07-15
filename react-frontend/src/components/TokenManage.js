import React, { Component } from 'react';
import DTUToken from "../contracts/DTUToken";

export default class TokenManage extends Component {

    componentWillMount() { //init영역 : 화면이 그려지기 전에 불리는 시스템함수임.
        //(화면이 뜨기전시점 : contract 생성 및 초기화
        this.DTUToken = new DTUToken();
        this.DTUToken.initContract('/DTUToken.json');
    }

    componentDidMount() {
        console.log('componentDidMount start');

        //getMyAccount
        this.DTUToken.getMyAccount().then((account) => {
            this.myAccountInput.value = account;
            console.log('in componentDidMount:' + account);
        }).catch((err) => {
            console.log(err.message);
        });

        console.log('componentDidMount End');
    }

    onTransferClick() {
        console.log('Transfer clicked:' + this.transferValueInput.value);
        this.DTUToken.transfer(this.transferToInput.value , this.transferValueInput.value);

    }

    render() {
        return (
            <div>
                <br/>                    {/* INPUT + SET버튼 */ }
                <input type="text"  placeholder="to Account (0x...)"
                       ref = {(input) => {this.transferToInput = input}}
                />
                <input type="text" placeholder="value (#Token)"
                       ref = {(input) => {this.transferValueInput = input}}
                />
                <button onClick = {this.onTransferClick.bind(this)}> TRANSFER </button>

                <br/>
                <br/>
                myAccount:
                <input type="text" disabled
                       ref = {(input) => {this.myAccountInput = input}}
                />
                <br/>
                (Metamask에서 add Token눌러서, DTUToken이 배포된 address를 넣어 토큰 추가한 후에 전달 가능)
            </div>
        );
    }
}
