import React from 'react';
import ReactDOM from 'react-dom';
import hmacsha1 from "hmacsha1";
import {Base64} from "js-base64";
import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'
import {Button, Modal, message} from 'antd';
import PostForm from './post_form';

export default class POST extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        htmlContent: '请输入内容',
        responseList: [],// 已上传文件列表
        content: '',
        modalVisible: true,
        title: '',
        articleID: null
      }
      this.receiveHtml = this.receiveHtml.bind(this);
      this.onChange = this.onChange.bind(this);
      this.beforeUpload = this.beforeUpload.bind(this);
      this.getSignature = this.getSignature.bind(this);
      this.getPolicy = this.getPolicy.bind(this);
    }
    receiveHtml(content) {
      //清空responseList
      this.setState(
        {
          responseList:[],
          content: content
        }
      );
    }
    componentDidMount() {}
    onChange(info) {
      console.log(info);
      let currFileList = info.fileList;
      currFileList = currFileList.filter((f) => (!f.length));
      
  
      //Read remote address and display.
      //读取远程路径并显示链接
      currFileList = currFileList.map((file) => {
        if (file.response) {
          // concat url
          // 组件会将 file.url 作为链接进行展示
          file.url = file.response;
        }
        if (!file.length) {
          return file;
        }
      });
      let _this = this;
  
      // filtering successed files
      //按照服务器返回信息筛选成功上传的文件
      currFileList = currFileList.filter((file) => {
        //multiple uploading?
        //根据多选选项更新添加内容
        let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
        if (hasNoExistCurrFileInUploadedList) {
          if (!!_this.props.isMultiple == true) {
            _this.state.responseList.push(file);
          } else {
            _this.state.responseList = [file];
          }
        }
        return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
      });
      currFileList = uniqBy(currFileList, "name");
      if (!!currFileList && currFileList.length != 0) {
        this.setState({responseList: currFileList});
      }
      _this.forceUpdate();
    }
    beforeUpload(file) {
    }
    getSignature(fileName) {
      let now = new Date();
      let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
      let Signature = Base64.encode(h);
      return Signature;
    }
    hideModal(articleID){
      this.setState({
        modalVisible: false,
        articleID: articleID
      });
    }
    getPolicy(fileName) {
      let now = new Date();
      let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //expiration date time
      let policy = Base64.encode(JSON.stringify({
        "bucket": "devopee",
        "save-key": "/" + fileName,
        "expiration": Math.round(afterHour.getTime() / 1000),
        "date": now
      }));
      return policy;
    }

    checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }


    submit(){
      fetch('/api/article', {
        method: 'PUT',
        body: JSON.stringify({
          id: this.state.articleID,
          content: this.state.content
        }),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'same-origin'
      }).then(this.checkStatus)
      .then(response => {
        message.success('发表成功')
      })
      .catch(error => {
         message.error(error.message)
      });
    }
    handleOk() {
      this.setState({
        modalVisible: false
      });
    }
    handleCancel() {

    }

    render() {
      let policy = "";
  
      //uploadProps configration: https://ant.design/components/upload/
      //uploadProps 配置方法见 https://ant.design/components/upload-cn/
      const uploadProps = {
        action: "/api/image",
        onChange: this.onChange.bind(this),
        listType: 'picture',
        fileList: this.state.responseList,
        multiple: true,
        beforeUpload: this.beforeUpload,
        showUploadList: true
      }
      const modalProps = {
        visible: this.state.modalVisible,
        onOk: this.handleOk.bind(this),
        footer: null,
        closable: false
      }
      return (
        <div>
          <LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}/>
          <Button onClick={this.submit.bind(this)}>提交</Button>
          <Modal {...modalProps}>
            <PostForm handleClick={this.hideModal.bind(this)}/>
          </Modal>
        </div>
      );
    }
  }