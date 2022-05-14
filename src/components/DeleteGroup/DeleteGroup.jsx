import { useNavigate } from 'react-router-dom';
import {
  Button,
} from 'antd';

import './DeleteGroup.css';

export default function EditEvent({
  isEdit,
}) {
  const navigate = useNavigate();

  const deleteGroup = () => {
    console.log('Group deleted');
    navigate('/personal');
  };
  if (isEdit === true) {
    return (
      <div>
        <p className="deleteTitle">Delete Group</p>
        <p className="deleteContent">Once you delete the group, there&apos;s no going back. Please be certain.</p>
        <Button className="delete-button" type="primary" onClick={deleteGroup}>
          Delete
        </Button>
      </div>
    );
  }
}
