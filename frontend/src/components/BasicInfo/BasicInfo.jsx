import {
  Button,
} from 'antd';

import './BasicInfo.css';

export default function BasicInfo() {
  return (
    <div>
      <h1 className="section-title">Basic Info</h1>
      <hr />
      <div className="content">
        <span className="item-name">
          <p>User Name</p>
          <p>Question for Password Recovery</p>
          <p>Answer for Password Recovery</p>
        </span>
        <span className="item-content">
          <p>Christine Wang</p>
          <p>What&apos;s your undergraduate name?</p>
          <p>National Taiwan University</p>
        </span>
        <span className="item-name">
          <p>Google Calender Sync</p>
        </span>
        <span className="item-content">
          <Button type="primary" className="connect" shape="round">Connect</Button>
        </span>
      </div>
    </div>
  );
}
