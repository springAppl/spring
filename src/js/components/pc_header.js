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

    handleSubmit(e) {
        // 
    }

    render(){
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined 
        ? 
        <Menu.Item key="logout" className="">
            <Button type="primary" htmlType="button" >{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link target="_blank">
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button">退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" class="register">
            <Icon type="appstore" />注册/登录
        </Menu.Item>;
        return (
            <div className="pcHeader">
                <header>
                    <Row>
                        <Col span={2}/>
                        <Col span={4}>
                            <a  href="/" className="logo">
                                <img src={logo} alt="logo" />
                                <span>ReactNews</span>
                            </a>
                        </Col>
                        <Col span={16}>
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
                                <Tabs type="card">
                                    <TabPane tab="注册" key="2">
                                        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem label="账户">
                                                <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                                            </FormItem>
                                            <FormItem lable="密码">
                                                <Input type="pass" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
                                            </FormItem>
                                            <FormItem label="确认密码">
                                                <Input placeholder="请再次输入你的密码" {...getFieldProps('r_confirmPassword')} />
                                            </FormItem>
                                            <Button type="primary" htmlType="submit">注册</Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </header>    
            </div>
        );
    }
}
export default PCHeader = Form.create({})(PCHeader);