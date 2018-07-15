import React, {Component, Fragment} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import TourProduct from "../contracts/TourProduct";

const Product = (props) => {
    return (
        <Card>
            <CardImg top src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=358&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle> {props.product.name} </CardTitle>
                <CardSubtitle> {props.product.price} DTU </CardSubtitle>
                <CardText> {props.product.detail} </CardText>
                <Button tag={Link} to={'/detail/'+JSON.stringify(props.product)}> 상세보기 </Button>
            </CardBody>
        </Card>
    )
}

//a Row of products: product Count is 1 or 2 or 3
const OneRow = (props) => {
    return (
        <Row>
            {
                props.list.map((row, i) => {
                    return (
                        <Fragment>
                            <Col sm="1">
                            </Col>
                            <Col sm="3">
                                <Product product={row}/>
                            </Col>
                        </Fragment>
                    );
                })
            }
        </Row>
    );
}

export default class ProductList extends Component {

    componentWillMount() { //init영역 : 화면이 그려지기 전에 불리는 시스템함수임.
        //(화면이 뜨기전시점 : contract 생성 및 초기화
        this.tourProduct = new TourProduct();
        this.tourProduct.initContract('/TourProduct.json');
    }

    state = {
        list:[]
    };

    testData ={
        list: [
            {name:'Test Tour1', price:200, agent:'Hana Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Test Tour2', price:500, agent:'Hana Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Test Tour3', price:600, agent:'Hana Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
            {name:'Test Tour4', price:400, agent:'Hana Tour', detail:'Some quick example text to build on the card title and make up the bulk '},
        ]
    };

    componentDidMount() {
        this.tourProduct.getSize().then((value) => {
           console.log('blockChain product Size:'+ value);

           if (value === 0) { //TestData Setting
               this.setState({ list: this.testData.list });
           } else { //blockchain에서 data가져오기
               let list = [];
               for (let i=0; i < value; i++){
                   this.tourProduct.getProduct(i).then((productJson) => {
                       console.log('productJson:' + productJson);
                       let product = JSON.parse(productJson);
                       list.push(product);
                       if (i === value - 1) { //data다 가져오면 출력
                           this.setState({ list:list});
                       }
                   });
               }
           }
        });
    }

    render() {
        return (
            <Container fluid>
                {
                    this.state.list.map( (row, i, arr) => {
                        const isRowTagStart = (i % 3 === 0);
                        {/* 보통 3개, 마지막줄일경우 3개거나 3으로 나눈 나머지 개수 :로 자른후 낱개로 자름*/}
                        const elementCount =  ( i >= 3 * parseInt(arr.length/3)) ? (arr.length - 3*parseInt(arr.length/3)) : 3;

                        if (isRowTagStart)
                            return (
                                <Fragment>
                                    <br/>
                                    <OneRow list={ arr.slice(i, i + elementCount).slice() }/>
                                </Fragment>
                            );
                  })
                }
            </Container>
        )
    }
}