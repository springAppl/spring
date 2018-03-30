import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import '../../css/pc.css';

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <PCFooter></PCFooter>
            </div>
        );
    }
} 