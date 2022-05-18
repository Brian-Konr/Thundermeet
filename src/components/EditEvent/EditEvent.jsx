import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input,
} from 'antd';

import './EditEvent.css';

const { TextArea } = Input;

export default function EditEvent({
  eventName, setEventName, eventDescription, setEventDescription,
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
    navigate('/event_time');
  };

  const submitChange = () => {
    console.log(
      'Title:',
      eventName,
      '\nDescription:',
      eventDescription,
    );
    navigate('/event_time');
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
