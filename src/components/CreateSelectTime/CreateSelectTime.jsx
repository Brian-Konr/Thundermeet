import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  DatePicker, Form, Select, Switch, Tooltip,
} from 'antd';

import './CreateSelectTime.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const periodOptions = Array.from(Array(25).keys()).map((ele) => {
  if (ele < 10) return `0${ele}`;
  return `${ele.toString()}`;
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
        <Form.Item>
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <p style={{ fontSize: '15px', marginRight: '15px', paddingTop: '2px' }}>From</p>
            <Select className="inputTime" defaultValue={10} style={{ width: '75px' }} onChange={(value) => setStartTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
            <p style={{
              fontSize: '15px', marginLeft: '15px', marginRight: '15px', paddingTop: '2px',
            }}
            >
              To
            </p>
            <Select className="inputTime" defaultValue={22} style={{ width: '75px' }} onChange={(value) => setEndTime(value)}>{periodOptions.map((period) => <Option key={period} value={period}>{period}</Option>)}</Select>
          </div>
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <p className="header" style={{ marginTop: '-10px' }}>Priority</p>
          <Tooltip title="Enable users to fill in available time with preference">
            <InfoCircleOutlined style={{ marginLeft: '10px', marginTop: '15px' }} />
          </Tooltip>
        </div>
        <Form.Item
          name="enablePriority"
        >
          <Switch className="priority" checked={eventPriority} checkedChildren="Enabled" unCheckedChildren="Disabled" defaultChecked={eventPriority} onChange={onChangePriority} />
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
          <RangePicker className="inputDate" dropdownClassName="inputDate" style={{ width: '385px' }} defaultPickerValue={eventDateRange} onChange={onChangeDate} />
        </Form.Item>
      </div>
    </Form>
  );
}
