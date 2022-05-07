import {
  DatePicker, Form, Radio, Switch, TimePicker,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

import './CreateSelectTime.css';

const { RangePicker } = DatePicker;

export default function CreateSelectTime({
  eventTypeIsSpecificDays, setEventTypeIsSpecificDays, eventPriority, setEventPriority,
  eventTimeRange, setEventTimeRange, eventDateRange, setEventDateRange,
}) {
  const typeOptions = [<Radio value>Specific Dates</Radio>,
    <Radio value={false}>Days of the week</Radio>];

  const onChangePriority = (e) => {
    console.log('Event Priority:', e);
    setEventPriority(e);
  };

  const onChange = (e) => {
    console.log('Event Type is Specific Date:', e.target.value);
    setEventTypeIsSpecificDays(e.target.value);
  };

  const onChangeTime = (value, dateString) => {
    // console.log('Selected Date Range1:', value);
    console.log('Selected Time Range:', dateString);
    setEventTimeRange(dateString);
  };

  const onChangeDate = (value, dateString) => {
    // console.log('Selected Date Range1:', value);
    console.log('Selected Date Range:', dateString);
    setEventDateRange(dateString);
  };

  if (eventTypeIsSpecificDays === true) {
    return (
      <Form>
        <div className="all">
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
            <TimePicker.RangePicker format="HH:00" style={{ width: '385px' }} defaultPickerValue={eventTimeRange} onChange={onChangeTime} />
          </Form.Item>
          <p className="header">Priority</p>
          <Form.Item
            name="enablePriority"
          >
            <Switch className="priority" checkedChildren="Enabled" defaultChecked={eventPriority} onChange={onChangePriority} />
          </Form.Item>
          <p className="header">Type</p>
          <Form.Item
            name="eventType"
          >
            <Radio.Group
              onChange={onChange}
              value={eventTypeIsSpecificDays}
              defaultValue
            >
              {typeOptions}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please select event date range!',
              },
            ]}
          >
            <RangePicker style={{ width: '385px' }} defaultPickerValue={eventDateRange} onChange={onChangeDate} />
          </Form.Item>
        </div>
      </Form>
    );
  }
  return (
    <Form>
      <div className="all">
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
          <TimePicker.RangePicker format="HH:00" style={{ width: '385px' }} onChange={onChangeTime} />
        </Form.Item>
        <p className="header">Priority</p>
        <Form.Item
          name="enablePriority"
        >
          <Switch className="priority" checkedChildren="Enabled" defaultChecked={eventPriority} onChange={onChangePriority} />
        </Form.Item>
        <p className="header">Type</p>
        <Form.Item
          name="eventType"
        >
          <Radio.Group
            onChange={onChange}
            value={eventTypeIsSpecificDays}
            defaultValue
          >
            {typeOptions}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please select at least one day!',
            },
          ]}
        >
          <ButtonGroup>
            <button className="day" type="button">Sun</button>
            <button className="day" type="button">Mon</button>
            <button className="day" type="button">Tue</button>
            <button className="day" type="button">Wed</button>
            <button className="day" type="button">Thu</button>
            <button className="day" type="button">Fri</button>
            <button className="day" type="button">Sat</button>
          </ButtonGroup>
        </Form.Item>
      </div>
    </Form>
  );
}
