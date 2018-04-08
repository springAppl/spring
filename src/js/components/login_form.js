import React from 'react';
import {Form, Input, Button, Icon, Tag} from 'antd';
import '../../css/login_form.css';
const FormItem = Form.Item;
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            tags: []
        });
    }
    componentWillMount() {
        this.setState({
            allTags: ['t1','t2','t3','t4']
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props.form.getFieldsValue());
    }
    render(){
        const { getFieldDecorator } = this.props.form;
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
                                this.state.allTags.map(ele => {
                                    return <Tag key={ele} closable>ele</Tag>
                                })
                            }
                        </div>
                    )
                }
            </FormItem>

            <FormItem>
                {
                    getFieldDecorator('topic')(
                        <div>
                            {
                                this.state.tags.map(ele => {
                                    return <Tag key={ele} closable>ele</Tag>
                                })
                            }
                        </div>
                    )
                }
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">Log in</Button>
            </FormItem>
        </Form>
        );
    }
}
export default  LoginForm = Form.create({})(LoginForm);