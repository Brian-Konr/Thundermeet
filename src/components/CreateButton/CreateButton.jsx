/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import {
  Button, message, Modal,
} from 'antd';
import { format } from 'date-fns';

import instance from '../../instance';
import getNumberOfDays from '../../utils/getNumberOfDays';

import './CreateButton.css';

export default function CreateButton({
  eventName, eventDescription, eventPriority,
  eventDateRange, startTime, endTime, setLoading,
}) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventID, setEventID] = useState('');

  const submitEvent = async () => {
    // POST event
    setLoading(true);

    try {
      const res = await instance.post('/v1/events/', {
        dateOrDays: true,
        endDate: `${format(new Date(eventDateRange[1]), "yyyy-MM-dd'T'HH:mm:ss")}+08:00`,
        endTime: `${endTime}00`,
        eventName,
        eventDescription,
        isPriorityEnabled: eventPriority,
        startDate: `${format(new Date(eventDateRange[0]), "yyyy-MM-dd'T'HH:mm:ss")}+08:00`,
        startTime: `${startTime}00`,
      });
      setLoading(false);
      setEventID(res.data.event_id);
      setIsModalVisible(true);
      // store event id
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
      message.error('Failed to create event...', 2);
    }
  };
  const check = () => {
    if (!eventName.trim()) {
      message.error('Title cannot be empty!', 2);
      return;
    }
    if (Number(startTime) >= Number(endTime)) {
      message.error('Start time cannot be larger than end time!', 2);
      return;
    }
    if (eventDateRange.length === 0) {
      message.error('Please select date ranges!', 2);
      return;
    }
    if (getNumberOfDays(eventDateRange[0], eventDateRange[1]) > 14) {
      message.error('Date ranges cannot be larger than 2 weeks!', 2);
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
          <br />
          <img src="src/icons/thunder.png" width="50px" alt="" />
          <br />
          <p style={{ textAlign: 'center' }}>Please fill in avaliable time for {eventName} in the follwing link! {`${import.meta.env.VITE_FRONTEND_URL}/event-time/${eventID}`}</p>
          <br />
          <CopyToClipboard text={`Please fill in avaliable time for ${eventName} in the follwing link! ${import.meta.env.VITE_FRONTEND_URL}/event-time/${eventID}`}>
            <Button
              type="primary"
              className="gotit-button"
              onClick={() => navigate(`/event-time/${eventID}`)}
            >
              Copy above text
            </Button>
          </CopyToClipboard>
        </div>
      </Modal>
    </>
  );
}
