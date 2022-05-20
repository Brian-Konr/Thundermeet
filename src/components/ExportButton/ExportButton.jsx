/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import {
  AppleFilled,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Form, message, Modal, Select,
} from 'antd';

import logo from '../../icons/logo.png';

import './ExportButton.css';

export default function ExportButton({
  eventList, setExportToApple, setExportToGoogle, setExportToEvent,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const eventOptionList = [];
  for (let i = 0; i < eventList.length; i += 1) {
    eventOptionList.push(<Option key={i}>{eventList[i]}</Option>);
  }

  const clickButton = () => {
    setIsModalVisible(true);
  };

  const clickApple = () => {
    setIsModalVisible(false);
    message.success('export to apple calendar succeeded!');
    setExportToApple(true);
  };

  const clickGoogle = () => {
    setIsModalVisible(false);
    message.success('export to google calendar succeeded!');
    setExportToGoogle(true);
  };

  const clickEvent = () => {
    setIsModalVisible(false);
    setIsEventVisible(true);
  };

  return (
    <>
      <Button className="button-round" icon={<Icon icon="fe:export" width="15px" style={{ marginRight: '3%' }} />} onClick={clickButton}>
        Export Event
      </Button>
      <Modal
        visible={isModalVisible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              height: '150px', width: '25%', border: '1px solid #B8B8B8', borderRadius: '8px',
            }}
            onClick={clickApple}
          >
            <AppleFilled style={{ fontSize: '50px', marginTop: '30px', marginLeft: '64px' }} />
            <p style={{ marginTop: '10px', marginLeft: '40px' }}>Apple Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '25%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px',
            }}
            onClick={clickGoogle}
          >
            <Icon icon="flat-color-icons:google" width="50px" style={{ marginTop: '35px', marginLeft: '65px' }} />
            <p style={{ marginLeft: '36px' }}>Google Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '45%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px',
            }}
            onClick={clickEvent}
          >
            <img src={logo} alt="logo" style={{ height: '60px', marginTop: '30px', marginLeft: '15px' }} />
            <p style={{ marginLeft: '86px' }}>Thundermeet Calendar</p>
          </div>
        </div>
      </Modal>
      <Modal
        visible={isEventVisible}
        okText="Add"
        title="Choose Event to Export:"
        onCancel={() => {
          setIsEventVisible(false);
        }}
        onOk={() => {
          setIsEventVisible(false);
          setExportToEvent(eventList[form.getFieldValue('selectEvent')]);
          message.success(`export to event: ${eventList[form.getFieldValue('selectEvent')]} succeeded!`);
        }}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item label="Select Event" name="selectEvent">
            <Select
              style={{ width: '70%' }}
              placeholder="Select existing event"
            >
              {eventOptionList}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
