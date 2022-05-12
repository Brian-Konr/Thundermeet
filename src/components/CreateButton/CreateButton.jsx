/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button, Modal,
} from 'antd';

import './CreateButton.css';

export default function CreateButton({
  eventName, eventDescription, eventPriority, eventTypeIsSpecificDays,
  eventTimeRange, eventDateRange,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const copyText = `Please fill in avaliable time for ${eventName} in the follwing link! https://thundermeet.com/demolink123`;

  const submitEvent = () => {
    setIsModalVisible(true);
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
      eventTimeRange,
      '\nDate Range:',
      eventDateRange,
    );
  };

  const goToEvent = () => {
    navigate('/event-time');
  };

  return (
    <>
      <Button type="primary" className="submit-button" onClick={submitEvent}>
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
            <Button className="copy" icon={<CopyOutlined />} />
          </CopyToClipboard>
          <br />
          <img src="src/icons/thunder.png" width="50px" alt="" />
          <br />
          <p>Please fill in avaliable time for {eventName} in the follwing link!</p>
          <p>https://thundermeet.com/demolink123</p>
          <br />
          <Button type="primary" className="gotit-button" onClick={goToEvent}>
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
