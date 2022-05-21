/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button, Modal,
} from 'antd';

import './EventCopyConfirmLink.css';

export default function EventCopyConfirmLink({ eventName, schedule, copyLink }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const year = schedule[0].getFullYear();
  const month = schedule[0].getMonth() + 1;
  const date = schedule[0].getDate();
  const hourStart = schedule[0].getHours();
  const minuteStart = schedule[0].getMinutes();
  const hourEnd = schedule[schedule.length - 1].getHours();
  const minuteEnd = schedule[schedule.length - 1].getMinutes();
  let timeString = `${year}/${month}/${date} ${hourStart}:${minuteStart} - ${hourEnd}:${minuteEnd}`;
  if (minuteEnd.toString().length === 1) {
    timeString = `${year}/${month}/${date} ${hourStart}:${minuteStart} - ${hourEnd}:0${minuteEnd}`;
  }
  if (minuteStart.toString().length === 1) {
    timeString = `${year}/${month}/${date} ${hourStart}:0${minuteStart} - ${hourEnd}:${minuteEnd}`;
  }
  if (minuteStart.toString().length === 1 && minuteEnd.toString().length === 1) {
    timeString = `${year}/${month}/${date} ${hourStart}:0${minuteStart} - ${hourEnd}:0${minuteEnd}`;
  }

  const copyText = `Final time for ${eventName} is decided! Check for more details in: ${copyLink}`;

  const clickButton = () => {
    setIsModalVisible(true);
  };

  const unClickButton = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="button-round" icon={<CopyOutlined />} onClick={clickButton}>
        Copy Link
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
          <p>Final time for {eventName} is decided! Check for more details in: {copyLink}</p>
          <br />
          <Button type="primary" className="gotit-button" onClick={unClickButton}>
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
