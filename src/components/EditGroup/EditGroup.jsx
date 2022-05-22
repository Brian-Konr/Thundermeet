import {
  Button, message,
} from 'antd';

import './EditGroup.css';

export default function EditGroup({
  isEdit, setIsEdit, editTitle, setGroupTitle, ongoingEvents, editOngoingEvents, setOngoingEvents,
  setEditOngoingEvents, decidedEvents, editDecidedEvents, setDecidedEvents, setEditDecidedEvents,
  setSubmit,
}) {
  async function handleConfirmEdit() {
    if (!editTitle.trim()) {
      message.error('Group Name cannot be empty!', 1.5);
      return;
    }
    setGroupTitle(editTitle.trim());
    setOngoingEvents(editOngoingEvents);
    setDecidedEvents(editDecidedEvents);
    setIsEdit(false);
    setSubmit(true);
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
