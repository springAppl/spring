import React from 'react';
import { Row, Col} from 'antd';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from './pc_index';
import MobileIndex from './mobile_index';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import Detail from './pc_detail';
import '../../css/pc.css';
import MobileDetail from './mobile_detail';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import '../../css/mobile.css';
import POST from './post';
import UserCenter from './usercenter';
import LoginForm from './login_form';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <Router>
                        <div className="pcWrapper">
                            <PCHeader></PCHeader>
                                <Route exact path="/" component={PCIndex}></Route>
                                <Route path="/detail/:uniquekey" component={Detail}></Route>
                                <Route path="/post" component={POST}></Route>  
                                <Route path="/usercenter" component={UserCenter}></Route>  
                                <Route path="/login" component={LoginForm}></Route>
                            <PCFooter></PCFooter>
                        </div>
                    </Router>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <Router>
                        <div >
                            <MobileHeader></MobileHeader>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={22}>
                                        <Route exact path="/" component={MobileIndex} />
                                    </Col>
                                    <Col span={1}></Col>
                                </Row> 
                                <Route path="/detail/:uniquekey" component={MobileDetail}/>
                            <MobileFooter></MobileFooter>
                        </div>
                    </Router>
                </MediaQuery>
            </div>
        );
    }
}