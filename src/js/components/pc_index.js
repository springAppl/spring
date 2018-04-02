import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import '../../css/pc.css';
import { Row, Col, Carousel } from 'antd';
import NewsBlock from './pc_newsblock';

export default class PCIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carousels: []
        }
    }

    componentWillMount(){
        this.carousels();
    }

    carousels(){
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
                <PCHeader></PCHeader>
                <Row>
                <Col span={1}/>
                <Col span={22}>
                    <div className="content">
                        <div className="carouselWrapper">
                            <Carousel autoplay>
                                {
                                    this.state.carousels.map(ele => {
                                        return <div key={ele.key}><img src={ele.src} width="300px" height="400px"/></div>;
                                    })
                                }
                            </Carousel>
                        </div>
                        <NewsBlock></NewsBlock>
                    </div>
                </Col>
                <Col span={1}/>
                </Row>
                <PCFooter></PCFooter>
            </div>
        );
    }
} 