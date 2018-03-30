import React from 'react';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from './pc_index';
import MobileIndex from './mobile_index';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileIndex/>
                </MediaQuery>
            </div>
        );
    }
}