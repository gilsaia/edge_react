import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import nkimg from './images/nk.png';
import { Button, Card, Col, Row, Upload, Icon, message, Layout, PageHeader, Spin } from 'antd';
import { timingSafeEqual } from 'crypto';
const { Header, Footer, Sider, Content } = Layout;
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  action: '/api/edge',
  accept: "image/*",
};
class Uploadimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upload: false,
      raw: '',
      result: '',
      isloading: false
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'uploading') {
      this.setState({ isloading: true });
    }
    else if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.setState({ upload: true, raw: info.file.response.raw_image, result: info.file.response.result, isloading: false });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    if (this.state.upload) {
      return (
        <Spin spinning={this.state.isloading}>
          <Row>
            <Col span={12}>
              <Card title="Raw image">
                <img src={this.state.raw} style={{ width: '100%' }}></img>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Result">
                <img src={this.state.result} style={{ width: '100%' }}></img>
              </Card>
            </Col>
          </Row>
        </Spin>)
    }
    else {
      return (
        <Spin spinning={this.state.isloading}>
          <Card title="Upload image" bodyStyle={{ height: '350px' }}>
            <Dragger {...props} onChange={this.onChange}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
        </p>
            </Dragger>
          </Card>
        </Spin>)
    }
  }
}
class Edgedetection extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ height: '76px' }}>
            <img src={nkimg}></img>
          </Header>
          <Content>
            <PageHeader title="Media Computing Lab" subTitle="Edge Detection" />
            <div style={{ padding: '30px' }}>
              <Row gutter={16}>
                <Col span={24}>
                  <Uploadimage></Uploadimage>
                </Col>
              </Row>
            </div>

          </Content>
        </Layout>
      </div>
    );
  }
}
ReactDOM.render(
  <Edgedetection />,
  document.getElementById('app')
);