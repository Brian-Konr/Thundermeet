import { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import {
  Button, Input,
} from 'antd';

import changeName from '../../utils/changeName';

import './BasicInfo.css';

export default function BasicInfo({
  userName, setUserName, passwordAnswer, userID,
}) {
  const [revisedName, setRevisedName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = () => {
    (async () => {
      await changeName(revisedName);
      setUserName(revisedName);
      setIsEdit(false);
    })();
    // call api to change name
  };

  const onCancel = () => {
    setRevisedName('');
    setIsEdit(false);
  };

  if (isEdit === true) {
    return (
      <div>
        <div className="header">
          <h1 className="section-title">Basic Info</h1>
        </div>
        <hr />
        <div className="content">
          <span className="item-name">
            <p>Nickname</p>
            <p>User ID</p>
            <p>Question for Password Recovery</p>
            <p>Answer for Password Recovery</p>
          </span>
          <span className="item-content">
            <Input.Group style={{ width: '100%' }} compact>
              <Input className="edit-input" style={{ width: '25%' }} defaultValue={userName} onChange={(e) => { setRevisedName(e.target.value); }} />
              <Button className="cancelButton" type="primary" onClick={onCancel}>Cancel</Button>
              <Button className="submit-button" type="primary" disabled={!revisedName || revisedName === userName} onClick={onSubmit}>Submit</Button>
            </Input.Group>
            <p>{userID}</p>
            <p>What&apos;s the name of your college or senior high?</p>
            <p>{passwordAnswer}</p>
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
          <p>Nickname</p>
          <p>User ID</p>
          <p>Question for Password Recovery</p>
          <p>Answer for Password Recovery</p>
        </span>
        <span className="item-content">
          <p style={{ textDecoration: 'underline 1px' }}>{userName}</p>
          <p>{userID}</p>
          <p>What&apos;s the name of your college or senior high?</p>
          <p>{passwordAnswer}</p>
        </span>
      </div>
    </div>
  );
}
