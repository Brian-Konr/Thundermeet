import {
  DatePicker, Form, Select, Switch,
} from 'antd';

import './CreateSelectTime.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const periodOptions = Array.from(Array(25).keys()).map((ele) => {
  if (ele < 10) return `0${ele}`;
  return ele.toString();
});

export default function CreateSelectTime({
  eventPriority, setEventPriority,
  eventDateRange, setEventDateRange, setStartTime, setEndTime,
}) {
  const onChangePriority = (e) => {
    console.log('Event Priority:', e);
    setEventPriority(e);
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
            <p>Starting from ...</p>
            <Select className="inputTime" defaultValue="10" onChange={(value) => setStartTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
            <p>No later than ...</p>
            <Select className="inputTime" defaultValue="22" onChange={(value) => setEndTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
          </div>
        </Form.Item>
        <p className="header">Priority</p>
        <Form.Item
          name="enablePriority"
        >
          <Switch className="priority" checked={eventPriority} checkedChildren="Enabled" defaultChecked={eventPriority} onChange={onChangePriority} />
        </Form.Item>
        <p className="header">Date Range</p>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please select event date range!',
            },
          ]}
        >
          <RangePicker className="inputTime" style={{ width: '385px' }} defaultPickerValue={eventDateRange} onChange={onChangeDate} />
        </Form.Item>
      </div>
    </Form>
  );
}
