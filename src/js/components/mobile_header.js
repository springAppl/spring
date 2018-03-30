import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../images/logo.png';

export default class MobileHeader extends React.Component {
    render(){
        return (
            <div className="mobileHeader">
                <header>
                    <img src={logo} alt="logo" />
                    <span>ReactNews</span>
                </header>
            </div>
        );
    }
}