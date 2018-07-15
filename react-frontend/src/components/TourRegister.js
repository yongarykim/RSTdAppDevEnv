import React, {Component,Fragment} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TourProduct from '../contracts/TourProduct';

export default class TourRegister extends Component {

    constructor(props) {
        super(props);
        this.productNameRef = React.createRef(); //16.4.0, Testing not using now
        this.onTestStoreClick = this.onTestStoreClick.bind(this);
    }

    componentWillMount() { //init영역 : 화면이 그려지기 전에 불리는 시스템함수임.
        //(화면이 뜨기전시점 : contract 생성 및 초기화
        this.tourProduct = new TourProduct();
        this.tourProduct.initContract('/TourProduct.json');
    }

    testData = {
        list: [
            {name:'Tour1', price:200, agent:'Hana1 Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Tour2', price:500, agent:'Hana2 Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Tour3', price:600, agent:'Hana3 Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Tour4', price:400, agent:'Hana4 Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
        ]
    };

    //testData 일괄 블록체인에 저장
    onTestStoreClick() {

        this.testData.list.forEach((product) => {
            this.tourProduct.insertProduct(product.name, product.price, product.agent, product.detail);
            console.log('insertProduct Called : printing before inserted..');
        })

        //개수 출력: insert가 바로 안되므로 나중에 실행 필요.
        //this.tourProduct.getSize().then((value) => {
        //    console.log(value);
        //    console.log(value.toNumber());
        //});
    }

    onSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);

        //data 값 읽어서
        let data = {};
        data.name = event.target[0].value;
        data.price = event.target[1].value;
        data.area = event.target[2].value;
        data.detail = event.target[3].value;
        data.agent = event.target[4].value;
        data.image = event.target[5].value;

        console.log("onSubmit:");
        console.log(data);

        //블록체인 이나 백엔드 로 보내기.

    }

    render() {
        return (
            <Fragment>
            <Form onSubmit = {this.onSubmit.bind(this)}>
                <br/><br/>
                <FormGroup row>
                    <Label for="productName" sm={{ size: 2, offset: 1 }}> 상품명 </Label>
                    <Col sm={8}>
                        <Input type="text"  name="productName" ref={this.productNameRef} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="productPrice" sm={{ size: 2, offset: 1 }}> 상품가격 </Label>
                    <Col sm={8}>
                        <Input type="text" id="productPrice" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="area" sm={{ size: 2, offset: 1 }}> 지역카테고리 </Label>
                    <Col sm={8}>
                        <Input type="select" id="area">
                            <option> 동남아 </option>
                            <option> 중국 </option>
                            <option> 일본 </option>
                            <option> 남태평양 </option>
                            <option> 유럽 </option>
                            <option> 북미 </option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="productDetail" sm={{ size: 2, offset: 1 }}> 상세 정보 </Label>
                    <Col sm={8}>
                        <Input type="textarea" style={{ height: 200 }} id="productDetail" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="tourAgent" sm={{ size: 2, offset: 1 }}> 투어 공급자명 </Label>
                    <Col sm={8}>
                        <Input type="text" id="tourAgent" placeholder="" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageFile" sm={{ size: 2, offset: 1 }}> 상품이미지 </Label>
                    <Col sm={8}>
                        <Input type="file" name="file" id="imageFile" />
                        <FormText color="muted">
                            png 또는 jpg파일, 사이즈는 1M이하를 첨부해주세요
                        </FormText>
                    </Col>
                </FormGroup>
                <br/>
                <FormGroup row>
                    <Col sm={{ size: 7, offset: 5 }}>
                        <Button type='submit' style={{ width:150 }}> 저  장 </Button>
                    </Col>
                </FormGroup>
            </Form>

            <br/>
            <br/>
            <button onClick = {this.onTestStoreClick}> Test여행상품 일괄저장 </button>
            </Fragment>

        );
    }
}
