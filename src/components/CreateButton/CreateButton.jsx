/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button, message, Modal,
} from 'antd';

import './CreateButton.css';

export default function CreateButton({
  eventName, eventDescription, eventPriority, eventTypeIsSpecificDays,
  eventDateRange, startTime, endTime,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const copyText = `Please fill in avaliable time for ${eventName} in the follwing link! https://thundermeet.com/demolink123`;

  const submitEvent = async () => {
    console.log(
      'Title:',
      eventName,
      '\nDescription:',
      eventDescription,
      '\nPriority:',
      eventPriority,
      '\nSpecific Days:',
      eventTypeIsSpecificDays,
      '\nTime Range:',
      Number(startTime),
      Number(endTime),
      '\nDate Range:',
      new Date(eventDateRange[0]).toISOString(),
      new Date(eventDateRange[1]).toISOString(),
    );

    // POST event

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
          <CopyToClipboard text={copyText}>
            <Button className="copy" icon={<CopyOutlined />} onClick={() => message.success('successfully copied the text!', 2)} />
          </CopyToClipboard>
          <br />
          <img src="src/icons/thunder.png" width="50px" alt="" />
          <br />
          <p>Please fill in avaliable time for {eventName} in the follwing link!</p>
          <p>https://thundermeet.com/demolink123</p>
          <br />
          <Button
            type="primary"
            className="gotit-button"
            // onClick={() => navigate('/event-time')}
            onClick={() => setIsModalVisible(false)}
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
