import React from 'react';
import PCNewsImageBlock from './pc_news_image_block';
import { Row, Col} from 'antd';
import '../../css/pc_detail.css';
export default class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: null,
            pagecontent: null
        }
    }
    componentWillMount(){
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                title: json.title,
                pagecontent: json.pagecontent
            });
        })
    }
    createMarkup() {
		return {__html: this.state.pagecontent};
	}
    render() {
        return(
            <div>

                <Row>
                    <Col className="article"   span={16}>
                        <article>
                            <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                        </article> 
                    </Col>
                    <Col span={8} className="BlockRight">
                        <PCNewsImageBlock newsType="yule" imageWidth={95} cartTitle="热点"/>
                    </Col>
                </Row>
                               
            </div>
        );
    }
}