import React from 'react';
import '../../css/pc_newsblock.css';


export default class NewsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.newsType  + '&count='+this.props.newsNum)
        .then(response => response.json())
        .then(json => {
            this.setState({
                data: json
            });
        })
    }
    render() {
        return (
            <div className="NewsBlock">
                {   this.state.data.map((ele, index) => <h4 key={index}>{ele.title}</h4>)   }
            </div>
        );
    }
}