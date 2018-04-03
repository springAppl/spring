import React from 'react';
import { Row, Col, Carousel, Tabs } from 'antd';
import NewsBlock from './pc_newsblock';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;

export default class PCIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carousels: []
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
            <div className="content">
                <Row>
                    <Col className="BlockLeft"   span={16}>
                        <div className="carouselWrapper">
                            <Carousel autoplay>
                                {
                                    this.state.carousels.map(ele => {
                                        return <div key={ele.key}><img src={ele.src} width="380px" height="350px"/></div>;
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="newsCard">
                            <Tabs>
                                <TabPane tab="头条" key="top">
                                    <NewsBlock newsType="top" newsNum={10}/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="newsCard">
                            <Tabs>
                                <TabPane tab="娱乐" key="yule">
                                    <NewsBlock newsType="yule" newsNum={10}/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="newsCard">
                            <Tabs>
                                <TabPane tab="国际" key="guoji">
                                    <NewsBlock newsType="guoji" newsNum={10}/>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={8} className="BlockRight">
                        <PCNewsImageBlock newsType="yule" imageWidth={95} cartTitle="热点"/>
                    </Col>
                </Row>
            </div>
        );
    }
} 