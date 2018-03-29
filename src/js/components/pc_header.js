import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../images/logo.png';
export default class PCHeader extends React.Component {
    render(){
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={4}><img src={logo} alt="logo" /></Col>
                    <Col span={18}>
                        <Menu mode="horizontal"  selectedKeys={["first"]}>
                            <Menu.Item key="first">
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                            <Menu.Item>
                                <Icon type="mail" /> mail
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
          </div>
        );
    }
}