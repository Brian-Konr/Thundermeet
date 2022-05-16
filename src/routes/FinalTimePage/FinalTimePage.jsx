/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import {
  Tag,
} from 'antd';

import CalendarForFinal from '../../components/CalendarForFinal/CalendarForFinal';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyConfirmLink from '../../components/EventCopyConfirmLink/EventCopyConfirmLink';
import ExportButton from '../../components/ExportButton/ExportButton';
import Navbar from '../../components/Navbar/Navbar';

import './FinalTimePage.css';

export default function FinalTimePage() {
  // params
  const eventTitle = '專題會議';
  const tagList = ['SAD', 'milestone2'];
  const eventDescription = '請大家算好交通時間';
  const startTime = 0; // start hour
  const endTime = 6; // end hour
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
  const [selectedGroup, setSelectedGroup] = useState(''); // store selected group's name
  // params for add to category
  const groupList = ['SAD course', 'Global Express', 'NTUIM'];
  // params for export
  const eventList = ['SAD-1', 'SAD-2', 'SAD-3'];
  // output for export
  const [exportToApple, setExportToApple] = useState(false); // when user chooses to export apple, turns true(export schedule)
  const [exportToGoogle, setExportToGoogle] = useState(false); // when user chooses to export google, turns true(export schedule)
  const [exportToEvent, setExportToEvent] = useState(''); // when user chooses to export to event, turns event's name, @ 郭 用 shedule 去 set EventTimePage's exportTime

  return (
    <>
      <Navbar />
      <div style={{ height: '92vh', background: '#F8F8F8' }}>
        <span style={{ marginLeft: '55%' }}>
          <ExportButton eventList={eventList} setExportToApple={setExportToApple} setExportToGoogle={setExportToGoogle} setExportToEvent={setExportToEvent} />
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
          <CalendarForFinal schedule={schedule} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} />
        </div>
      </div>
    </>
  );
}
