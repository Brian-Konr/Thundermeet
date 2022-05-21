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
import exportToGoogle from '../../utils/exportToGoogle';
import exportToOtherEvent from '../../utils/exportToOtherEvent';
import getMyEvents from '../../utils/getMyEvents';

import './ExportButton.css';

export default function ExportButton({
  eventTitle, eventDescription, schedule, eventID,
}) {
  const [eventList, setEventList] = useState([]);
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
    message.success('Export to Apple Calendar succeeded!');
  };

  const exportGoogle = async () => {
    const sortedTime = Object.values(schedule).sort((a, b) => new Date(a) - new Date(b));
    const start = sortedTime[0].toISOString();
    const end = new Date(sortedTime[sortedTime.length - 1].getTime() + 30 * 60000).toISOString();
    await exportToGoogle(eventTitle, eventDescription, start, end);
    message.success('Export to Google Calendar succeeded!');
    setIsModalVisible(false);
  };

  const clickEvent = async () => {
    // fetch all events
    message.warning('Getting event info...', 1.5);
    const res = await getMyEvents();
    console.log(res.data);
    if (res.status === 'success') {
      setEventList(res.data.filter((event) => !event.is_confirmed && event.event_id !== Number(eventID)).map((event) => ({
        id: event.event_id,
        name: event.event_name,
        startDate: event.start_date,
        startTime: Number(event.start_time.substring(0, 2)),
        endDate: event.end_date,
        endTime: Number(event.end_time.substring(0, 2)),
      })));
      // 只顯示還沒 confirm 且不是這個 event 的 events
    }
    setIsModalVisible(false);
    setIsEventVisible(true);
  };

  const exportEvent = async (destEventID) => {
    if (!destEventID) {
      message.error('Please choose which event to export!', 1.5);
      return;
    }
    await exportToOtherEvent(eventID, destEventID, schedule, eventList.filter((event) => event.id === destEventID)[0]);
    // 要跟後端確認怎麼傳，可能是傳 disable array 過去
    message.success(`Export to event: ${eventList.filter((event) => event.id === destEventID)[0].name} succeeded!`);
    setIsEventVisible(false);
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
            onClick={exportGoogle}
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
        onOk={async () => {
          exportEvent(Number(form.getFieldValue('selectEvent')));
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
              {eventList.map((eventObj) => <Option key={eventObj.id}>{eventObj.name}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
