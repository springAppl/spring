import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import '../../css/mobile.css';
import { Tabs, Carousel } from 'antd';
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
        this.changeTab(this.state.activeKey);
    }

    changeTab(activeKey){
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + activeKey  + '&count=10')
        .then(response => response.json())
        .then(json => {
            this.setState({
                data: json
            });
            console.log(json);
        })
        // todo 获取activeKey对应到tab,进行填充内容

    }

    render() {
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Tabs onChange={this.changeTab.bind(this)}>
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
                    </TabPane>
                    <TabPane tab="社会" key="shehui">
                    </TabPane>
                    <TabPane tab="国内" key="guonei">
                    </TabPane>
                    <TabPane tab="国际" key="guoji">
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                    </TabPane>
                    <TabPane tab="体育" key="tiyu">
                    </TabPane>
                    <TabPane tab="科技" key="keji">
                    </TabPane>
                    <TabPane tab="时尚" key="shishang">
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    }
}