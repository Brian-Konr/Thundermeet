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

import logo from '../../icons/thunder.png';

import './EventCopyConfirmLink.css';

export default function EventCopyConfirmLink({ eventName, schedule, copyLink }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          <img src={logo} width="50px" alt="" />
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
