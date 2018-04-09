import React from 'react';
import {Form, Input, Button, Icon, Tag} from 'antd';
import '../../css/login_form.css';
const FormItem = Form.Item;
class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tags: ['技术','产品','感悟','随笔'],
            visable: false,
            value: ''
        };
    }
    componentWillMount() {
        
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleClick();
        
    }
    handleClose(event) {
        const tags = this.state.tags.filter(tag => tag !== event);
        console.log(tags);
    }
    viewNewTag(){
        this.setState({


            
            visable: true
        });
    }
    handlePressEnter(){
        this.setState((prev)=> {
            var tags = this.state.tags.slice();
            tags[tags.length] = this.state.value;
            return {
                tags: tags,
                value: '',
                visable: false
            }
        });
    }
    handleInputChange(e) {
        this.setState({ value: e.target.value });
    }
    saveInputRef = input => this.input = input
    render(){
        const { getFieldDecorator } = this.props.form;
        const { tags, visable, value } = this.state;
        return (
            <Form  onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
                {
                    getFieldDecorator('title')(
                        <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="title" />
                    )
                }
            </FormItem>
            <FormItem>
                {
                    getFieldDecorator('topic')(
                        <div>
                            {
                                this.state.tags.map(ele => {
                                    return <Tag key={ele} closable onClose={this.handleClose.bind(this,ele)}>{ele}</Tag>
                                })
                            }
                            {!this.state.visable && (<Tag key="new" onClick={this.viewNewTag.bind(this)}><Icon type="plus" />New Tag</Tag>)}
                            {this.state.visable&&(<FormItem><Input type="text" value={value} onPressEnter={this.handlePressEnter.bind(this)} onChange={this.handleInputChange.bind(this)}/></FormItem>)}
                        </div>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={this.handleSubmit.bind(this)} >确定</Button>
            </FormItem>
        </Form>
        );
    }
}
export default  PostForm = Form.create({})(PostForm);