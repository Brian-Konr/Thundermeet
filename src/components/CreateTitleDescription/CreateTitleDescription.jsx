import { Form, Input } from 'antd';

import './CreateTitleDescription.css';

const { TextArea } = Input;

export default function CreateTitleDescription({ setEventName, setEventDescription }) {
  const handleChangeName = (e) => {
    setEventName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setEventDescription(e.target.value);
  };

  return (
    <Form>
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
      </div>
    </Form>
  );
}
