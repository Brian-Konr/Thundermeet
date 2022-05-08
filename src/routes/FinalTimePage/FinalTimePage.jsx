/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Button, Select, Tag,
} from 'antd';

import CalendarForFinal from '../../components/CalendarForFinal/CalendarForFinal';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyConfirmLink from '../../components/EventCopyConfirmLink/EventCopyConfirmLink';
import Navbar from '../../components/Navbar/Navbar';

import './FinalTimePage.css';

export default function FinalTimePage() {
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
  const memberList = ['小陳', '小王', '小葉', '小郭'];
  const selectedList = {};
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
  const schedule = [new Date(2022, 4, 3, 0, 0, 0), new Date(2022, 4, 3, 0, 30, 0)]; // final chosen time list
  // output for add to category
  const [selectedGroup, setSelectedGroup] = useState(); // store selected group's key number
  // params for add to category
  const groupList = [<Option key="1">SAD course</Option>, <Option key="2">Global Express</Option>,
    <Option key="3">NTUIM</Option>];

  return (
    <>
      <Navbar />
      <div style={{ height: '92vh', background: '#F8F8F8' }}>
        <span style={{ marginLeft: '55%' }}>
          <Button className="button-round" icon={<Icon icon="fe:export" width="15px" style={{ marginRight: '3%' }} />}>Export Calendar</Button>
          <EventAddToGroup setSelectedGroup={setSelectedGroup} groupList={groupList} />
          <EventCopyConfirmLink eventName={eventTitle} schedule={schedule} />
        </span>
        <div style={{ width: '92%', marginLeft: '4%' }}>
          <span>
            <h1 style={{ fontWeight: 'bold', display: 'inline-block' }}>{eventTitle}</h1>
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
        <div className="container-final">
          <CalendarForFinal schedule={schedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} />
        </div>
      </div>
    </>
  );
}
