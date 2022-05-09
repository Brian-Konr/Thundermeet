/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Tag,
} from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import CalendarForDisplay from '../../components/CalendarForDisplay/CalendarForDisplay';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyLink from '../../components/EventCopyLink/EventCopyLink';
import ImportButton from '../../components/ImportButton/ImportButton';
import Navbar from '../../components/Navbar/Navbar';

import './EventTimePage.css';

export default function EventTimePage() {
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
  const [exportTime, setExportTime] = useState([new Date(2022, 4, 3, 0, 0, 0), new Date(2022, 4, 3, 0, 30, 0)]); // when user export other event's specific time here
  // output for left(2 arrays & user_id)
  const [normalDay, setNormalDay] = useState([]);
  const [priorityDay, setPriorityDay] = useState([]);
  // -----
  const [schedule, setSchedule] = useState([]);
  // 這段比較特別：若要讓左邊拖曳記住狀態：setSchedule(normalDay+priorityDay) 並 setPriorityDay(priorityDay)，不需要setNormalDay
  // 因為邏輯是 schedule 代表所有選取時間，priority 則是我加顏色上去的時間
  // -----
  // output for add to category
  const [selectedGroup, setSelectedGroup] = useState(); // store selected group's name
  // params for add to category
  const groupList = ['SAD course', 'Global Express', 'NTUIM'];
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
  // params for import from apple calendar
  const appleSchedule = [new Date(2022, 4, 5, 0, 0, 0), new Date(2022, 4, 5, 0, 30, 0)];
  // params for import from google calendar
  const googleSchedule = [new Date(2022, 4, 5, 2, 0, 0), new Date(2022, 4, 5, 2, 30, 0)];
  // params for import from event
  const eventList = {};
  eventList['SAD-1'] = [new Date(2022, 4, 4, 0, 0, 0), new Date(2022, 4, 4, 0, 30, 0)];
  eventList['SAD-2'] = [new Date(2022, 4, 8, 0, 0, 0), new Date(2022, 4, 8, 0, 30, 0)];
  eventList['SAD-3'] = [new Date(2022, 4, 5, 0, 0, 0), new Date(2022, 4, 5, 0, 30, 0)];

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
          <ImportButton appleSchedule={appleSchedule} googleSchedule={googleSchedule} eventList={eventList} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
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
          <Calendar schedule={schedule} setSchedule={setSchedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} enablePriority={enablePriority} normalDay={normalDay} setNormalDay={setNormalDay} priorityDay={priorityDay} setPriorityDay={setPriorityDay} exportTime={exportTime} />
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
