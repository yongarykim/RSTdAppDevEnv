import React, {Component, Fragment} from 'react';
import { Container, Row, Col, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

const Reviews = (props) => {
    return (
        <Container fluid>
            {
                props.list.map((row, i) => {
                    return(
                        <Fragment>
                            <br/>
                            <Card body>
                            <CardSubtitle> {row.date} {row.user} 별점:{row.star}</CardSubtitle>
                            <br/>
                            <CardText> {row.review}</CardText>
                            </Card>
                        </Fragment>
                    )
                })
            }
        </Container>
    );
}

/**
   @props: product : 하나의 상품
 */
export default class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            product: JSON.parse(this.props.product),
            reviews: [
                {
                    date:'2018-01-01',
                    user:'alice',
                    star: 4,
                    review:'It\'s a perfect tour if you have not come to town tours, sunsets and fireflies in one day.\n' +
                    'As a guide, you do not have to be in good weather\n' +
                    'We can arrange and arrange local restaurants for you! I did not take this tour on the first day\n'
                },
                {
                    date:'2017-12-01',
                    user:'mcquire',
                    star: 3,
                    review:'We can arrange and arrange local restaurants for you! I did not take this tour on the first day'
                },
            ]
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Container fluid>
                <br/>
                <Row>
                    <Col sm="12">
                        <Breadcrumb>
                            <BreadcrumbItem><a href="#">여행지</a></BreadcrumbItem>
                            <BreadcrumbItem active>일본</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Card>
                            <CardImg src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=500&h=300" alt="Card image cap" />
                        </Card>
                    </Col>
                    <Col sm="6">
                        <Card body>
                            <CardTitle>{this.state.product.name}</CardTitle>
                            <br/>
                            <CardSubtitle> 가격 : {this.state.product.price} DTU </CardSubtitle>
                            <br/>
                            <CardText> {this.state.product.agent}</CardText>
                        </Card>
                        <br/>
                        <Button style={{width:"100%"}}> 예약하기 </Button>
                    </Col>
                </Row>
                <Row> {/* Tab */}
                    <Col sm={"12"}>
                        <br/>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    <h5> 상 세 설 명 </h5>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    <h5> 사 용 자 후 기 </h5>
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <br/>
                                        {/*<h4> 상세 설명</h4>*/}
                                        <h5> {this.state.product.detail} </h5>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <Reviews list={this.state.reviews}/>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>

            </Container>
        );
    }
}
