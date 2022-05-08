/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightOutlined, DownloadOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Select, Tag,
} from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import CalendarForDisplay from '../../components/CalendarForDisplay/CalendarForDisplay';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyLink from '../../components/EventCopyLink/EventCopyLink';
import Navbar from '../../components/Navbar/Navbar';

import './EventTimePage.css';

export default function EventTimePage() {
  const { Option } = Select;

  // params
  const eventTitle = '專題會議';
  const tagList = ['SAD', 'milestone2'];
  const eventDescription = '請大家算好交通時間';
  const startTime = 0; // start hour
  const endTime = 6; // end hour
  const type = 'DATE'; // display type: DATE or DAYS
  const startDate = new Date(2022, 4, 2); // start date(if weekday, weekday switch to the nearest date)
  const numOfDays = 7; // continue number of days(for both weekday & date)
  const copyLink = 'https://thundermeet.com/demolink123';
  // params for left
  const enablePriority = true; // creator enable priority or not
  // output for left(2 arrays & user_id)
  const [normalDay, setNormalDay] = useState([]);
  const [priorityDay, setPriorityDay] = useState([]);
  // output for add to category
  const [selectedGroup, setSelectedGroup] = useState(); // store selected group's key number
  // params for add to category
  const groupList = [<Option key="1">SAD course</Option>, <Option key="2">Global Express</Option>,
    <Option key="3">NTUIM</Option>];
  // params for right
  const memberList = ['小陳', '小王', '小葉', '小郭'];
  const selectedList = {}; // should include all time block(here for display only few timeblocks)
  selectedList[new Date(2022, 4, 2, 0, 0, 0)] = {
    normal: ['小陳', '小王'],
    priority: ['小葉', '小郭'],
    notAvailable: [],
  };
  selectedList[new Date(2022, 4, 2, 0, 30, 0)] = {
    normal: ['小陳', '小王'],
    priority: ['小郭'],
    notAvailable: ['小葉'],
  };
  selectedList[new Date(2022, 4, 2, 1, 0, 0)] = {
    normal: ['小陳'],
    priority: ['小郭'],
    notAvailable: ['小王', '小葉'],
  };
  selectedList[new Date(2022, 4, 3, 0, 0, 0)] = {
    normal: [],
    priority: ['小郭'],
    notAvailable: ['小陳', '小王', '小葉'],
  };
  selectedList[new Date(2022, 4, 3, 0, 30, 0)] = {
    normal: [],
    priority: [],
    notAvailable: ['小陳', '小王', '小葉', '小郭'],
  };

  const navigate = useNavigate();
  const confirmDate = () => {
    navigate('/confirm-time');
  };

  const editButton = () => {
    navigate('/edit-event');
  };

  return (
    <>
      <Navbar />
      <div style={{ height: '92vh', background: '#F8F8F8' }}>
        <span style={{ marginLeft: '55%' }}>
          <Button className="button-round" icon={<DownloadOutlined />}>Import Calendar</Button>
          <EventAddToGroup setSelectedGroup={setSelectedGroup} groupList={groupList} />
          <EventCopyLink eventName={eventTitle} copyLink={copyLink} />
        </span>
        <div style={{ width: '92%', marginLeft: '4%' }}>
          <span>
            <h1 style={{ fontWeight: 'bold', display: 'inline-block' }}>{eventTitle}</h1>
            <Icon icon="akar-icons:edit" width="25px" style={{ marginLeft: '85%' }} onClick={editButton} />
          </span>
          <div style={{
            background: '#B8B8B8', width: '100%', height: '1px', marginTop: '-14px', marginBottom: '5px',
          }}
          />
          <span>
            {tagList.map((tag) => (
              <Tag color="green">{tag}</Tag>
            ))}
          </span>
          <h3 style={{ marginTop: '5px' }}>{eventDescription}</h3>
        </div>
        <div className="container">
          <Calendar startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} enablePriority={enablePriority} normalDay={normalDay} setNormalDay={setNormalDay} priorityDay={priorityDay} setPriorityDay={setPriorityDay} />
          <CalendarForDisplay startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} />
          <Button
            style={{
              marginTop: '510px', marginLeft: '-30px', background: '#01A494', color: 'white',
            }}
            icon={<ArrowRightOutlined />}
            onClick={confirmDate}
          >
            Confirm Date
          </Button>
        </div>
      </div>
    </>
  );
}
