import {
  DatePicker, Form, Radio, Select, Switch,
} from 'antd';

import './CreateSelectTime.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const periodOptions = Array.from(Array(25).keys()).map((ele) => {
  if (ele < 10) return `0${ele}`;
  return ele.toString();
});

export default function CreateSelectTime({
  eventTypeIsSpecificDays, setEventTypeIsSpecificDays, eventPriority, setEventPriority,
  eventDateRange, setEventDateRange, setStartTime, setEndTime,
}) {
  const typeOptions = [<Radio value key="specific">Specific Dates</Radio>,
    <Radio value={false} key="daysOfTheWeek">Days of the week</Radio>];

  const onChangePriority = (e) => {
    console.log('Event Priority:', e);
    setEventPriority(e);
  };

  const onChange = (e) => {
    console.log('Event Type is Specific Date:', e.target.value);
    setEventTypeIsSpecificDays(e.target.value);
  };
  const onChangeDate = (value, dateString) => {
    // console.log('Selected Date Range1:', value);
    console.log('Selected Date Range:', dateString);
    setEventDateRange(dateString);
  };

  return (
    <Form>
      <div className="all">
        <p className="header">Time Period</p>
        {/* 5/15 15:53 下面是新改的 select time period 的 div，再麻煩 @王亭勻 修一下這邊的 css */}
        <Form.Item>
          <div>
            <p>Start from ...</p>
            <Select defaultValue="10" onChange={(value) => setStartTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
            <p>No later than ...</p>
            <Select defaultValue="22" onChange={(value) => setEndTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
          </div>
        </Form.Item>
        <p className="header">Priority</p>
        <Form.Item
          name="enablePriority"
        >
          <Switch className="priority" checked={eventPriority} checkedChildren="Enabled" defaultChecked={eventPriority} onChange={onChangePriority} />
        </Form.Item>
        <p className="header">Type</p>
        {/* 5/15 15:53 因為沒有要做 weekday 的功能，所以也麻煩 @王亭勻 把有關 weekday 判斷、render 的東西刪一刪～ */}
        <Form.Item
          name="eventType"
          initialValue
        >
          <Radio.Group
            onChange={onChange}
            value={eventTypeIsSpecificDays}
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
