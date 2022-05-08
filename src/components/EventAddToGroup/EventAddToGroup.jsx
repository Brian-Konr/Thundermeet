/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import {
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Form, Modal, Select,
} from 'antd';

import './EventAddToGroup.css';

export default function EventAddToGroup({ setSelectedGroup, groupList }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const clickButton = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Button className="button-round" icon={<PlusOutlined />} onClick={clickButton}>
        Add to Category
      </Button>
      <Modal
        title="Add Group"
        visible={isModalVisible}
        okText="Add"
        onOk={() => {
          setSelectedGroup(form.getFieldValue('selectGroup'));
          console.log(form.getFieldValue('selectGroup'));
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
              {groupList}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
