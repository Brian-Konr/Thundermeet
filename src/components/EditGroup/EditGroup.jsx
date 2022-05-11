import {
  Button,
} from 'antd';

import './EditGroup.css';

export default function EditGroup({
  isEdit, setIsEdit,
}) {
  if (isEdit === false) {
    return (
      <Button type="primary" className="edit-button" onClick={() => { setIsEdit(true); }}>
        Edit Group
      </Button>
    );
  }
  return (
    <div>
      <Button className="cancel-button" type="primary" onClick={() => { setIsEdit(false); }}>
        Cancel Edit
      </Button>
      <Button className="confirm-button" type="primary" onClick={() => { setIsEdit(false); }}>
        Confirm Edit
      </Button>
    </div>
  );
}
