import { useNavigate } from 'react-router-dom';
import {
  Button, message,
} from 'antd';

import deleteGroup from '../../utils/deleteGroup';

import './DeleteGroup.css';

export default function EditEvent({
  isEdit, groupID,
}) {
  const navigate = useNavigate();

  const deleteAction = async () => {
    const status = await deleteGroup(groupID);
    if (status === 'success') {
      message.success('Group deleted successfully!', 1.5);
      navigate('/personal');
    } else {
      message.error('Cannot delete group...', 1.5);
    }
  };
  if (isEdit === true) {
    return (
      <div>
        <p className="deleteTitle">Delete Group</p>
        <p className="deleteContent">Once you delete the group, there&apos;s no going back. Please be certain.</p>
        <Button className="delete-button" type="primary" onClick={deleteAction}>
          Delete
        </Button>
      </div>
    );
  }
}
