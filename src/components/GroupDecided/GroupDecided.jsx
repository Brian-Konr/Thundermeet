import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button, Card, Empty,
} from 'antd';

import './GroupDecided.css';

export default function GroupDecided({
  isEdit, decidedEvents, editDecidedEvents, setEditDecidedEvents,
}) {
  const navigate = useNavigate();
  function enterEvent(e) {
    navigate(`/final-time/${e.key}`);
  }

  function removeEvent(e) {
    setEditDecidedEvents(editDecidedEvents.filter((event) => event.key !== e.key));
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomEventGroup() {
    if (decidedEvents.length === 0) {
      return (
        <Empty className="empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      );
    }
    return Object.values(decidedEvents).map((group) => (
      <Button className="decided-card" type="primary" key={group.key} value={group.title} onClick={() => { enterEvent(group); }}>
        {group.title}
      </Button>
    ));
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function CustomEventGroupEdit() {
    if (editDecidedEvents.length === 0) {
      return (
        <Empty className="empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      );
    }
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
