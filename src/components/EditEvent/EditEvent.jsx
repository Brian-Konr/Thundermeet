import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message,
} from 'antd';

import deleteEvent from '../../utils/deleteEvent';
import editEvent from '../../utils/editEvent';

import './EditEvent.css';

const { TextArea } = Input;

export default function EditEvent({
  eventName, setEventName, eventDescription, setEventDescription, eventID,
  setEditLoading,
}) {
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setEventName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setEventDescription(e.target.value);
  };

  const deleteAction = async () => {
    setEditLoading(true);
    const status = await deleteEvent(eventID);
    setEditLoading(false);
    if (status === 'success') {
      message.success('Event has been deleted!', 1.5);
      navigate('/personal');
    } else {
      message.error('Cannot delete event...', 1.5);
      navigate(`/event-time/${eventID}`);
    }
  };

  const goToEvent = () => {
    navigate(`/event-time/${eventID}`);
  };

  const submitChange = async () => {
    if (!eventName.trim()) {
      message.error('Title can\'t be changed to empty!', 1.5);
      return;
    }
    setEditLoading(true);
    const status = await editEvent(eventID, eventName.trim() /* eventDescription */);
    setEditLoading(false);
    if (status === 'success') {
      message.success('Successfully updated!', 1.5);
      navigate(`/event-time/${eventID}`);
    } else message.error('Fail to update!', 2);
  };

  return (
    <Form
      fields={[
        {
          name: ['eventName'],
          value: eventName,
        },
        {
          name: ['eventDescription'],
          value: eventDescription,
        },
      ]}
    >
      <div className="all">
        <p className="header">Title</p>
        <Form.Item
          name="eventName"
          rules={[
            {
              required: true,
              message: 'Please enter event name!',
            },
          ]}
        >
          <Input className="input" type="eventName" placeholder="Enter event name" maxLength="30" style={{ width: '385px' }} onChange={handleChangeName} />
        </Form.Item>
        <p className="header">Description</p>
        <Form.Item
          name="eventDescription"
        >
          <TextArea className="input" type="eventDescription" placeholder="Enter event description (not required)" autoSize={{ minRows: 4, maxRows: 10 }} onChange={handleChangeDescription} />
        </Form.Item>
        <Form.Item>
          <Button className="cancelbutton" htmlType="button" onClick={goToEvent}>
            Cancel
          </Button>
          <Button className="confirmbutton" type="primary" htmlType="submit" onClick={submitChange}>
            Confirm
          </Button>
        </Form.Item>
        <p className="deleteTitle">Delete Event</p>
        <p className="deleteContent">Once you delete the event, there&apos;s no going back. Please be certain.</p>
        <Form.Item>
          <Button className="delete-button" type="primary" onClick={deleteAction}>
            Delete
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
