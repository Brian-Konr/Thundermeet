import { useNavigate } from 'react-router-dom';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
} from 'antd';

import './GroupOngoing.css';

export default function GroupOngoing({
  isEdit, ongoingEvents, editOngoingEvents, setEditOngoingEvents, setIsAddEvent,
}) {
  const navigate = useNavigate();

  function removeEvent(e) {
    setEditOngoingEvents(editOngoingEvents.filter((event) => event.key !== e.key));
    console.log(`removed ${e.key}`);
  }

  function CustomEventGroup() {
    return Object.values(ongoingEvents).map((group) => (
      <Card className="ongoing-card" type="primary" key={group.key} value={group.title} onClick={() => navigate(`/event-time/${group.key}`)}>
        {group.title}
      </Card>
    ));
  }

  function CustomEventGroupEdit() {
    return Object.values(editOngoingEvents).map((group) => (
      <div>
        <Card className="ongoing-card-edit" type="primary" key={group.key} value={group.title}>
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
          <h1 className="section-name">Ongoing Events</h1>
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
        <h1 className="section-name">Ongoing Events</h1>
        <PlusOutlined role="button" className="add" onClick={() => { setIsAddEvent(true); }} />
      </div>
      <hr />
      <div className="groups">
        <CustomEventGroupEdit />
      </div>
    </div>
  );
}
