import React from 'react';
import { connect } from 'dva';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Upload, message, Button, Icon } from 'antd';

const CodePreview = ({ children }) => (
  <pre
    style={{
      background: '#f2f4f5',
      padding: '12px 20px',
      margin: '12px 0',
    }}
  >
    <code>
      <Typography.Text>{children}</Typography.Text>
    </code>
  </pre>
);

@connect(({ file }) => ({
  file,
}))
class Demo extends React.Component {
  state = {
    file: {},
    fileList: [],
    uploading: false,
    success: false,
    fileValidation: false
  };

  handleUpload = () => {
    const { file } = this.state;
    const formData = new FormData();
    
      formData.append('myFile', file);
      console.log(file.name.slice(-4))
      if (file.name.slice(-4) !== '.jpg' && file.name.slice(-4) !== '.rar'){
        message.error('必须上传zip文件或者rar文件')

        this.setState({
          fileList: [],
          uploading: false,
        });
        message.error('请重新上传');
      }else{
        console.log('this is right')
        this.setState({fileValidation: true})
        this.setState({
          uploading: true,
        });
        const { dispatch } = this.props;
        dispatch({
          type: 'file/upload',
          payload: formData ,
          callback: (data) => {
            if(data.file_status === 'ok'){
              this.setState({
                fileList: [],
                uploading: false,
              });
              message.success('上传成功');
            }else{
              this.setState({
                uploading: false,
              });
              message.error('上传失败');
            }
          }
        })
      }
  };

  render() {
    const { uploading, file } = this.state;
    console.log(file)
    const props = {
      showUploadList : { showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false },
      onRemove: file => {
        this.setState({
            file: {},
        });
      },
      beforeUpload: file => {
        this.setState({
          file: file,
          fileList: [file],
        });
        return false;
      },
      fileList: this.state.fileList
    };

    return (
      <div>
        <CodePreview>
          <h3>SHP文件上传服务</h3>
          <p>·## 上传的文件格式必须为 .zip 或者 .rar 格式</p>
          <p>·## 请在上传前确认该SHP文件中相关的参数 如区域名以及对应的颜色</p>
        </CodePreview>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 选择zip文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={file === {}}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中' : '开始上传'}
        </Button>
      </div>
    );
  }
}


export default () => (
  <PageHeaderWrapper>
    <Card>
      <Demo />
    </Card>
      
  </PageHeaderWrapper>
);
