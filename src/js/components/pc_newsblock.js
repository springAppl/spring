import React from 'react';
import '../../css/pc_newsblock.css';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';


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
                {   this.state.data.map((ele, index) => <Link key={ele.uniquekey} to={"/detail/" + ele.uniquekey}><h4 key={index}>{ele.title}</h4></Link>)   }
            </div>
        );
    }
}