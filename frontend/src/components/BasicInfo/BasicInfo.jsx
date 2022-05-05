import { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import {
  Button, Input,
} from 'antd';

import './BasicInfo.css';

export default function BasicInfo() {
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState('Christine Wang');

  if (isEdit === true) {
    return (
      <div>
        <div className="header">
          <h1 className="section-title">Basic Info</h1>
        </div>
        <hr />
        <div className="content">
          <span className="item-name">
            <p>User Name</p>
            <p>User ID</p>
            <p>Question for Password Recovery</p>
            <p>Answer for Password Recovery</p>
          </span>
          <span className="item-content">
            <Input.Group style={{ width: '100%' }} compact>
              <Input className="edit-input" style={{ width: '25%' }} defaultValue={userName} onChange={(e) => { setUserName(e.target.value); }} />
              <Button className="submit-button" type="primary" onClick={() => { setIsEdit(false); }}>Submit</Button>
            </Input.Group>
            <p>christine891225</p>
            <p>What&apos;s your undergraduate name?</p>
            <p>National Taiwan University</p>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h1 className="section-title">Basic Info</h1>
        <FormOutlined role="button" onClick={() => { setIsEdit(true); }} className="edit" />
      </div>
      <hr />
      <div className="content">
        <span className="item-name">
          <p>User Name</p>
          <p>User ID</p>
          <p>Question for Password Recovery</p>
          <p>Answer for Password Recovery</p>
        </span>
        <span className="item-content">
          <p style={{ textDecoration: 'underline 1px' }}>{userName}</p>
          <p>christine891225</p>
          <p>What&apos;s your undergraduate name?</p>
          <p>National Taiwan University</p>
        </span>
      </div>
    </div>
  );
}
