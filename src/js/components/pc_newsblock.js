import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class NewsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.news();
    }
    news(){
        fetch('/data/news.json')
        .then(response => response.json())
        .then(json => {
            this.setState({
                data: json
            });
        })
    }
    render() {
        return (
            <Tabs>
                <TabPane tab="头条" key="1">
                    {
                        this.state.data.map(ele => <h4>{ele}</h4>)
                    }
                </TabPane>
                <TabPane tab="娱乐" key="2">Content of Tab Pane 2</TabPane>
            </Tabs>
        );
    }
}