import React, { Component } from 'react';
import SimpleStorage from "../contracts/SimpleStorage";

class SimpleStorageTest extends Component {

    componentWillMount() { //init영역 : 화면이 그려지기 전에 불리는 시스템함수임.
        //(화면이 뜨기전시점 : contract 생성 및 초기화
        this.simpleStorage = new SimpleStorage();
        this.simpleStorage.initContract('/SimpleStorage.json');

    }

    onSetClick() { //SET 클릭시 컨트랙트의 setValue호출
        console.log('SET clicked:' + this.setInput.value);
        this.simpleStorage.setValue(this.setInput.value);

    }

    onGetClick() { //GET 클릭시 컨트랙트의 getValue호출
        //getValue()는 promise형태 임.
        this.simpleStorage.getValue().then((value) => {
            this.getInput.value = value;
        });
        console.log('GET clicked:' + this.getInput.value);
    }

    render() {
        return (
            <div>
                <br/>                    {/* INPUT + SET버튼 */ }
                <input type="text"
                       ref = {(input) => {this.setInput = input}}
                />
                <button onClick = {this.onSetClick.bind(this)}> SET </button>

                <br/>
                <br/>                       {/* GET버튼 + INPUT */}
                <button onClick = {this.onGetClick.bind(this)}> GET </button>
                <input type="text"
                       ref = {(input) => {this.getInput = input}}
                />
            </div>
        );
    }
}
export default SimpleStorageTest;
