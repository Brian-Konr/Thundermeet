/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined, DownloadOutlined, PlusOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Tag,
} from 'antd';

import CalendarForConfirm from '../../components/CalendarForConfirm/CalendarForConfirm';
import Navbar from '../../components/Navbar/Navbar';

import './ConfirmTimePage.css';

export default function ConfirmTimePage() {
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
  // output
  const [schedule, setSchedule] = useState([]);

  const navigate = useNavigate();
  const cancelAction = () => {
    navigate('/event_time');
  };

  const confirmAction = () => {
    navigate('/final_time');
  };

  return (
    <>
      <Navbar />
      <div style={{ height: '92vh', background: '#F8F8F8' }}>
        <span style={{ marginLeft: '55%' }}>
          <Button className="button-round" icon={<DownloadOutlined />}>Import Calendar</Button>
          <Button className="button-round" icon={<PlusOutlined />}>Add to Category</Button>
          <Button className="button-round" icon={<CopyOutlined />}>Copy Link</Button>
        </span>
        <div style={{ width: '92%', marginLeft: '4%' }}>
          <span>
            <h1 style={{ fontWeight: 'bold', display: 'inline-block' }}>{eventTitle}</h1>
            <Icon icon="akar-icons:edit" width="25px" style={{ marginLeft: '85%' }} />
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
        <div className="container-confirm">
          <CalendarForConfirm schedule={schedule} setSchedule={setSchedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} />
          <Button
            style={{
              marginTop: '510px', marginLeft: '210px',
            }}
            onClick={cancelAction}
          >
            Cancel
          </Button>
          {schedule.length >= 1 ? (
            <Button
              style={{
                marginTop: '510px', marginLeft: '15px', background: '#01A494', color: 'white',
              }}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
