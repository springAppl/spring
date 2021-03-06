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
    Anchor,
    Modal 
} from 'antd';
import 'antd/dist/antd.css';
import logo from '../../images/logo.png';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Link = Anchor;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {

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
        if (e.key="register") {
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

    inserUserInfo(json) {
        this.setState({
            userNickName: json.userNickName,
            userid: json.userid
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

    login() {
		this.setModalVisible(true);
    };
    

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

    render(){

        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
        ? 
        <a href="/usercenter"><Icon type="inbox"/></a>
        : 
        <Icon type="setting" onClick={this.login.bind(this)}/>

        return (
            <div className="mobileHeader">
                <header>
                    <img src={logo} alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </header>
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
            </div>
        );
    }
}
export default MobileHeader = Form.create({})(MobileHeader);
