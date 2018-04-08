import React from 'react';
import { 
    Row, 
    Col, 
    Menu, 
    Icon, 
    Tabs, 
    message, 
    Form, 
    Input, 
    Button, 
    Checkbox, 
    Modal,
    Dropdown
} from 'antd';
import 'antd/dist/antd.css';
import logo from '../../images/logo.png';
import '../../css/pc_header.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    browserHistory,
    withRouter
  } from 'react-router-dom';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;


class PCHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'top',
            modaVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    }

    setModalVisible(value) {
        this.setState({
            modaVisible: value
        });
    }

    handleClick(e) {
        if (e.key == "register") {
            this.setState({
                current: 'register'
            });
            this.setModalVisible(true);
        } else{
            this.setState({
                current: e.key
            });
        }
    }

    setLogined(hasLogined){
        this.setState({
            hasLogined: true
        });
    }


    handleSubmit(e) {
        // 阻止冒泡事件
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        fetch('/data/login.json?userName=' + formData.r_username + '&password=' + formData.r_password + '&confirmPassword=' + formData.r_confirmPassword)
        .then(response => response.json())
        .then(json => {
            this.setState({
                userNickName: json.userNickName,
                userid: json.userid
            });
            localStorage.userid= json.userid;
			localStorage.userNickName = json.userNickName;      
        })
        .catch(function(ex) {
            console.log('parsing failed', ex)
        });
        if (this.state.action=="login") {
            this.setState({hasLogined:true});
        }
        
        message.success('请求成功');
        this.setModalVisible(false);
    }


    callback(key){
        if(key === "1") {
            this.setState({
                action: 'register'
            });
        } else if(key === "2") {
            this.setState({
                action: 'login'
            });
        }
    }


    logout() {
        localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false}); 
    }

    componentWillMount(){
		if (localStorage.userid != '') {
			this.setState({hasLogined:true});
			this.setState(
                {
                    userNickName: localStorage.userNickName,
                    userid: localStorage.userid
                }
            );
		}
    }
    




    render(){
        let {getFieldProps} = this.props.form;

        const menu = (
            <Menu >
              <Menu.Item>
                    <Link target="_blank" to={'/usercenter'}>
                        个人中心
					</Link>
              </Menu.Item>
              <Menu.Item key="logout">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">退出</a>
              </Menu.Item>
            </Menu>
          );

        const userShow = this.state.hasLogined
        ?
        <Menu.Item>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    {this.state.userNickName} <Icon type="down" />
                </a>
            </Dropdown>
        </Menu.Item>
        :
        <Menu.Item key="register" >
            <Icon type="appstore" />注册/登录
        </Menu.Item>;
        return (
            <div className="pcHeader">
                <header>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <a  href="/" className="logo">
                                <img src={logo} alt="logo" />
                                <span>ReactNews</span>
                            </a>
                        </Col>
                        <Col span={19}>
                            <Menu mode="horizontal"  selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                                <Menu.Item key="top">
                                    <Icon type="appstore" /> 头条
                                </Menu.Item>
                                <Menu.Item key="shehui">
                                    <Icon type="appstore" /> 社会
                                </Menu.Item>
                                <Menu.Item key="guonei">
                                    <Icon type="appstore" /> 国内
                                </Menu.Item>
                                <Menu.Item key="guoji">
                                    <Icon type="appstore" /> 国际
                                </Menu.Item>
                                <Menu.Item key="yule">
                                    <Icon type="appstore" /> 娱乐
                                </Menu.Item>
                                <Menu.Item key="tiyu">
                                    <Icon type="appstore" /> 体育
                                </Menu.Item>
                                <Menu.Item key="keji">
                                    <Icon type="appstore" /> 科技
                                </Menu.Item>
                                <Menu.Item key="shishang">
                                    <Icon type="appstore" /> 时尚
                                </Menu.Item>
                                {userShow}
                            </Menu>
                            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modaVisible}
                            onCancel={() => this.setModalVisible(false)}
                            onOk={() => this.setModalVisible(false)} okText="关闭" >
                                <Tabs type="card" defaultActiveKey="1" onChange={this.callback.bind(this)}>
                                    <TabPane tab="登录" key="1">
                                        <Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem label="账户">
                                                <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                                            </FormItem>
                                            <FormItem lable="密码">
                                                <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">登录</Button>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem label="账户">
                                                <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                                            </FormItem>
                                            <FormItem lable="密码">
                                                <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                <Input type="password" placeholder="请再次输入你的密码" {...getFieldProps('r_confirmPassword')} />
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Col>
                    </Row>
                </header>    
            </div>
        );
    }
}
export default PCHeader = Form.create({})(PCHeader);