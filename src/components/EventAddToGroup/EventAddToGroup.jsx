/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import {
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Form, message, Modal, Select,
} from 'antd';

import './EventAddToGroup.css';

export default function EventAddToGroup({ setSelectedGroup, groupList }) {
  const { Option } = Select;
  const groupOptionList = [];
  for (let i = 0; i < groupList.length; i += 1) {
    groupOptionList.push(<Option key={i}>{groupList[i]}</Option>);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const clickButton = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Button className="button-round" icon={<PlusOutlined />} onClick={clickButton}>
        Add to Group
      </Button>
      <Modal
        title="Add to Group"
        visible={isModalVisible}
        okText="Add"
        onOk={() => {
          if (groupList[form.getFieldValue('selectGroup')] === undefined) {
            message.warning('please choose a group to add to!');
          }
          setSelectedGroup(groupList[form.getFieldValue('selectGroup')]);
          setIsModalVisible(false);
          form.resetFields();
        }}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item label="Select Group" name="selectGroup">
            <Select
              style={{ width: '70%' }}
              placeholder="Select existing group"
            >
              {groupOptionList}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
