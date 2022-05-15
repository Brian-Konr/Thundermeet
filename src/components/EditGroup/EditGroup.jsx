import {
  Button,
} from 'antd';

import './EditGroup.css';

export default function EditGroup({
  isEdit, setIsEdit, editTitle, setGroupTitle, ongoingEvents, editOngoingEvents, setOngoingEvents,
  setEditOngoingEvents, decidedEvents, editDecidedEvents, setDecidedEvents, setEditDecidedEvents,
}) {
  function handleConfirmEdit() {
    setGroupTitle(editTitle);
    setOngoingEvents(editOngoingEvents);
    setDecidedEvents(editDecidedEvents);
    setIsEdit(false);
  }

  function handeCancelEdit() {
    setEditOngoingEvents(ongoingEvents);
    setEditDecidedEvents(decidedEvents);
    setIsEdit(false);
  }

  if (isEdit === false) {
    return (
      <Button type="primary" className="edit-button" onClick={() => { setIsEdit(true); }}>
        Edit Group
      </Button>
    );
  }
  return (
    <div>
      <Button className="cancel-button" type="primary" onClick={() => { handeCancelEdit(); }}>
        Cancel Edit
      </Button>
      <Button className="confirm-button" type="primary" onClick={() => { handleConfirmEdit(); }}>
        Confirm Edit
      </Button>
    </div>
  );
}