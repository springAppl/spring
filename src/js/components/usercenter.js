import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
const props = {
    name: 'file',
    action: '/api/image',
    onChange(info) {
        console.log(info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
};
export default class UserCenter extends React.Component {

    render(){
        return (<div>
                <h1>用户中心</h1>
                
            </div>)
    }
}