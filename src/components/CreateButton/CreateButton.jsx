/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button, message, Modal,
} from 'antd';

import instance from '../../instance';

import './CreateButton.css';

export default function CreateButton({
  eventName, eventDescription, eventPriority,
  eventDateRange, startTime, endTime,
}) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventID, setEventID] = useState('');

  const submitEvent = async () => {
    // POST event
    try {
      const res = await instance.post('/v1/events/', {
        dateOrDays: true,
        endDate: new Date(eventDateRange[1]).toISOString(),
        endTime: `${endTime}00`,
        eventName,
        eventDescription,
        isPriorityEnabled: eventPriority,
        startDate: new Date(eventDateRange[0]).toISOString(),
        startTime: `${startTime}00`,
      });
      setIsModalVisible(true);
      // store event id
      setEventID(res.data.event_id);
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
      message.error('failed to create event...', 2);
    }
    // if succeeded, navigate to event-time page with event id
  };
  const check = () => {
    if (!eventName.trim()) {
      message.error('eventName cannot be empty!', 2);
      return;
    }
    if (Number(startTime) >= Number(endTime)) {
      message.error('start time cannot larger than end time!', 2);
      return;
    }
    if (eventDateRange.length === 0) {
      message.error('please select date ranges!', 2);
      return;
    }
    submitEvent();
  };

  return (
    <>
      <Button type="primary" className="submit-button" onClick={check}>
        Create
      </Button>
      <Modal
        visible={isModalVisible}
        footer={null}
        centered
        closable={false}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CopyToClipboard text={`Please fill in avaliable time for ${eventName} in the follwing link! http://localhost:3000/edit-event/${eventID}`}>
            <Button className="copy" icon={<CopyOutlined />} onClick={() => message.success('successfully copied the text!', 2)} />
          </CopyToClipboard>
          <br />
          <img src="src/icons/thunder.png" width="50px" alt="" />
          <br />
          <p>Please fill in avaliable time for {eventName} in the follwing link!</p>
          <p>{`http://localhost:3000/edit-event/${eventID}`}</p>
          <br />
          <Button
            type="primary"
            className="gotit-button"
            onClick={() => navigate(`/event-time/${eventID}`)}
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
