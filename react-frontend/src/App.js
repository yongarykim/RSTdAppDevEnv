import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SimpleStorageTest from './components/SimpleStorageTest'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import ProductList from './components/ProductList'
import TourRegister from './components/TourRegister'
import ProductDetail from './components/ProductDetail'
import TokenManage from "./components/TokenManage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //axios.get('http://localhost:8080/data/user')
        //    .then( data => { console.log(data);})
        //    .catch( response => { console.log(response);} )
    }

    render() {
      return (
          <Router>
          <div>
              <div className="App">
                {/* 네비바 */}
                <TopBar/>

                <SideBar/>
              </div>

                  {/* 컨텐츠 - maybe 여행상품 목록*/}
                  <Route path="/" exact component={ProductList}/>

                  {/* 여행상품 상세
                  <Route path="/detail" exact component={ProductDetail}/> */}
                  <Route path="/detail/:product" render={(props) => { return(
                      <ProductDetail product={props.match.params.product} />
                  );}} />

                  {/* 투어상품 등록 */}
                  <Route path="/tour_register" exact component={TourRegister}/>

                  <Route path="/token_manage" component={TokenManage}/>

                  {/* simpleStorage 테스트 코드임 */}
                  <Route path="/simple_storage_test" component={SimpleStorageTest}/>

          </div>
          </Router>
      );
    }
}

export default App;