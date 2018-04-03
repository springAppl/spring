import React from 'react';
import { Row, Col} from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import '../../css/mobile_list.css';
export default class MobileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }
    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type  + '&count=' + this.props.count)
        .then(response => response.json())
        .then(json => {
            this.setState({
                news: json
            });
        })
    }
    render() {
        const newsList = this.state.news.map((newsItem, index) => (
            <section key={index} className="m_article list-item special_section clearfix">
                <Link to={'/detail/' + newsItem.uniquekey}>
                    <Row>
                        <Col span={8}>
                            <div className="m_article_img">
                                <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                            </div>
                        </Col>
                        <Col span={16}>
                            <div className="m_article_info">
                                <div className="m_article_title">
                                    <span>{newsItem.title}</span>
                                </div>
                                <div className="m_article_desc clearfix">
                                    <div className="m_article_desc_l">
                                    <span className="m_article_channel">{newsItem.realtype}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Link>
            </section>
        ));
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        );
    }
}