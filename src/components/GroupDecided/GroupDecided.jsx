import { CloseOutlined } from '@ant-design/icons';
import {
  Button, Card,
} from 'antd';

import './GroupDecided.css';

export default function GroupDecided({
  isEdit, decidedEvents, editDecidedEvents, setEditDecidedEvents,
}) {
  function enterEvent(e) {
    console.log(`selected ${e.key}`);
  }

  function removeEvent(e) {
    setEditDecidedEvents(editDecidedEvents.filter((event) => event.key !== e.key));
    console.log(`removed ${e.key}`);
  }

  function CustomEventGroup() {
    return Object.values(decidedEvents).map((group) => (
      <Button className="decided-card" type="primary" key={group.key} value={group.title} onClick={() => { enterEvent(group); }}>
        {group.title}
      </Button>
    ));
  }

  function CustomEventGroupEdit() {
    return Object.values(editDecidedEvents).map((group) => (
      <div>
        <Card className="decided-card-edit" type="primary" key={group.key} value={group.title}>
          {group.title}
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
