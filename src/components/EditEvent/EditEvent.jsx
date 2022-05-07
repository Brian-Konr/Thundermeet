import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, TimePicker,
} from 'antd';
import moment from 'moment';

import './EditEvent.css';

const { TextArea } = Input;

export default function EditEvent({
  eventName, setEventName, eventDescription, setEventDescription, eventTimeRange, setEventTimeRange,
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

  const onChangeTime = (value, dateString) => {
    // console.log('Selected Date Range1:', value);
    console.log('Selected Time Range:', dateString);
    setEventTimeRange(dateString);
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
      '\nTime Range:',
      eventTimeRange,
    );
    navigate('/event_time');
  };

  const format = 'HH:00';

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
        {
          name: ['timePeriod'],
          value: [moment(eventTimeRange[0], format), moment(eventTimeRange[1], format)],
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
        <p className="header">Time Period</p>
        <Form.Item
          name="timePeriod"
          rules={[
            {
              required: true,
              message: 'Please select time period!',
            },
          ]}
        >
          <TimePicker.RangePicker format={format} style={{ width: '385px' }} defaultPickerValue={eventTimeRange} onChange={onChangeTime} />
        </Form.Item>
        <Form.Item>
          <Button className="confirm-button" type="primary" htmlType="submit" onClick={submitChange}>
            Confirm
          </Button>
          <Button className="cancel-button" htmlType="button" onClick={goToEvent}>
            Cancel
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
