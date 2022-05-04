import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import {
  Button, Form, Input, Modal, Select,
} from 'antd';

import './MyGroups.css';

export default function MyGroups() {
  const { Option } = Select;
  const [groupCount, setGroupCount] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const eventList = [<Option key="1">SAD meeting</Option>, <Option key="2">SPM meeting</Option>,
    <Option key="3">Have fun</Option>];
  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
  };

  const dealWithOk = () => {
    setIsFormVisible(false);
    setGroupCount(groupCount + 1);
    form.validateFields().then((values) => {
      form.resetFields();
      onCreate(values);
    });
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div>
      <div className="header">
        <h1 className="section-title">My Groups</h1>
        <PlusOutlined role="button" className="add" onClick={() => { setIsFormVisible(true); }} />
        <Modal title="Add Group" visible={isFormVisible} okText="Add" onOk={() => { dealWithOk(); }} onCancel={() => { setIsFormVisible(false); }}>
          <Form
            layout="vertical"
          >
            <Form.Item
              label="Group Name"
              rules={[
                {
                  required: true,
                  message: 'Please input group name!',
                },
              ]}
            >
              <Input placeholder="Enter group name" />
            </Form.Item>
            <Form.Item label="Select Events">
              <Select
                mode="multiple"
                style={{ width: '70%' }}
                placeholder="Select existing events (not required)"
                onChange={() => { handleChange(); }}
              >
                {eventList}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <hr />
      <div className="groups">
        <p className="card default-card">已參與 Participated</p>
        <p className="card default-card">已確認 Confirmed</p>
        <p className="card default-card">已發起 Created</p>
        <p className="card custom-card">SAD</p>
      </div>
      <ModalForm
        title="新建表单"
        trigger={(
          <Button type="primary">
            <PlusOutlined />
            新建表单
          </Button>
        )}
      >
        <ProForm.Group>
          <ProFormText width="md" name="name" label="签约客户名称" tooltip="最长为 24 位" placeholder="请输入名称" />
          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
