import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message,
} from 'antd';

import editEvent from '../../utils/editEvent';

import './EditEvent.css';

const { TextArea } = Input;

export default function EditEvent({
  eventName, setEventName, eventDescription, setEventDescription, eventID,
}) {
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setEventName(e.target.value);
    console.log('Title:', e.target.value);
  };

  const handleChangeDescription = (e) => {
    setEventDescription(e.target.value);
    console.log('Description:', e.target.value);
  };

  const deleteEvent = () => {
    console.log('Event deleted');
    navigate('/personal');
  };

  const goToEvent = () => {
    navigate(`/event-time/${eventID}`);
  };

  const submitChange = async () => {
    if (!eventName.trim()) {
      message.error('Title 不得為空！', 1.5);
      return;
    }
    const status = await editEvent(eventID, eventName.trim() /* eventDescription */);
    if (status === 'success') {
      message.success('成功更新！', 1.5);
      navigate(`/event-time/${eventID}`);
    } else message.error('無法更新！', 2);
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
          <Input className="input" type="eventName" placeholder="Enter event name" style={{ width: '385px' }} onChange={handleChangeName} />
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
          <Button className="delete-button" type="primary" onClick={deleteEvent}>
            Delete
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
