import { CloseOutlined } from '@ant-design/icons';
import {
  Card,
} from 'antd';

import './GroupDecided.css';

export default function GroupDecided({
  isEdit, decidedEvents, setDecidedEvents,
}) {
  function enterEvent(e) {
    console.log(`selected ${e.key}`);
  }

  function removeEvent(e) {
    setDecidedEvents(decidedEvents.filter((event) => event.key !== e.key));
    console.log(`removed ${e.key}`);
  }

  function CustomEventGroup() {
    return Object.values(decidedEvents).map((group) => <Card className="decided-card" type="primary" onClick={() => { enterEvent(group); }}>{group}</Card>);
  }

  function CustomEventGroupEdit() {
    return Object.values(decidedEvents).map((group) => (
      <div>
        <Card className="decided-card-edit" type="primary">
          {group}
          <CloseOutlined role="button" className="remove" onClick={() => { removeEvent(group); }} />
        </Card>
      </div>
    ));
  }

  if (isEdit === false) {
    return (
      <div>
        <div className="header">
          <h1 className="section-name">Decided Events</h1>
        </div>
        <hr />
        <div className="groups">
          <CustomEventGroup />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h1 className="section-name">Decided Events</h1>
      </div>
      <hr />
      <div className="groups">
        <CustomEventGroupEdit />
      </div>
    </div>
  );
}
