import React from 'react';
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
            <article>
                <header><h2>{this.state.title}</h2></header>
                <div dangerouslySetInnerHTML={this.createMarkup()}></div>
            </article>
        );
    }
}