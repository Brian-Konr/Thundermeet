import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, Modal, Select,
} from 'antd';

import './MyGroups.css';

export default function MyGroups() {
  const { Option } = Select;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const eventList = [<Option key="1">SAD meeting</Option>, <Option key="2">SPM meeting</Option>,
    <Option key="3">Have fun</Option>];
  const [groupList, setGroupList] = useState([]);
  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setIsFormVisible(false);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function CustomButtonGroup() {
    return groupList.map((group) => <Button className="card custom-card" type="primary">{group}</Button>);
  }

  if (isFormVisible === true) {
    return (
      <div>
        <div className="header">
          <h1 className="section-title">My Groups</h1>
          <PlusOutlined role="button" className="add" onClick={() => { setIsFormVisible(true); }} />
          <Modal
            title="Add Group"
            visible={isFormVisible}
            okText="Add"
            onOk={() => {
              setGroupList((oldArray) => [...oldArray, form.getFieldValue('groupName')]);
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => {
              setIsFormVisible(false);
              form.resetFields();
            }}
          >
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="Group Name"
                name="groupName"
                rules={[
                  {
                    required: true,
                    message: 'Please input group name!',
                  },
                ]}
              >
                <Input placeholder="Enter group name" type="groupName" />
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
          <Button className="card default-card" type="primary">已參與 Participated</Button>
          <Button className="card default-card" type="primary">已確認 Confirmed</Button>
          <Button className="card default-card" type="primary">已發起 Created</Button>
          <CustomButtonGroup />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h1 className="section-title">My Groups</h1>
        <PlusOutlined role="button" className="add" onClick={() => { setIsFormVisible(true); }} />
      </div>
      <hr />
      <div className="groups">
        <Button className="card default-card" type="primary">已參與 Participated</Button>
        <Button className="card default-card" type="primary">已確認 Confirmed</Button>
        <Button className="card default-card" type="primary">已發起 Created</Button>
        <CustomButtonGroup />
      </div>
    </div>
  );
}
