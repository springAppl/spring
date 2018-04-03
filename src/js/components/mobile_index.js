import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import { Tabs, Carousel } from 'antd';
import MobileList from './mobile_list';
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carousels: [],
            activeKey: 'yule'
            
        }
    }
    componentWillMount(){
        fetch('/data/carousels.json')
        .then(response => response.json())
        .then(json => this.setState(
            {
                carousels: json
            }
        ));
    }

    render() {
        return (
            <div>
                <Tabs >
                    <TabPane tab="头条" key="top">
                        <div className="carouselWrapper">
                            <Carousel autoplay>
                                {
                                    this.state.carousels.map(ele => {
                                        return <div key={ele.key}><img src={ele.src} width="380px" height="100px"/></div>;
                                    })
                                }
                            </Carousel>
                        </div>
						<MobileList count={20} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key="shehui">
                        <MobileList count={20} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国际" key="guoji">
                        <MobileList count={20} type="guoji"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                        <MobileList count={20} type="yule"/>
                    </TabPane>
                    <TabPane tab="体育" key="tiyu">
                        <MobileList count={20} type="tiyu"/>
                    </TabPane>
                    <TabPane tab="科技" key="keji">
                        <MobileList count={20} type="keji"/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}