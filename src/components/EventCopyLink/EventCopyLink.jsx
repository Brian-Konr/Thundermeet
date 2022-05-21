/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {
  Button, Modal,
} from 'antd';

import './EventCopyLink.css';

export default function EventCopyLink({ eventName, copyLink }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const copyText = `Please fill in avaliable time for ${eventName} in the follwing link! ${copyLink}`;

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
          <p>Please fill in avaliable time for {eventName} in the follwing link! {copyLink}</p>
          <br />
          <Button type="primary" className="gotit-button" onClick={unClickButton}>
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
