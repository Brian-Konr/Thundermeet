/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import {
  AppleFilled, DownloadOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, message, Modal,
} from 'antd';

import logo from '../../icons/logo.png';
import getImportEventsInfo from '../../utils/getImportEventsInfo';
import CalendarForImport from '../CalendarForImport/CalendarForImport';

import './ImportButton.css';

export default function ImportButton({
  appleSchedule, googleSchedule, eventList, setEventList, startTime, endTime, type, startDate, numOfDays, setAppleConnect, setGoogleConnect, setAppleConfirm, setGoogleConfirm, setEventConfirm, enablePriority, eventID,
}) {
  const [eventChosen, setEventChosen] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppleVisible, setIsAppleVisible] = useState(false);
  const [isGoogleVisible, setIsGoogleVisible] = useState(false);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [eventScheduleNormal, setEventScheduleNormal] = useState([]);
  const [eventSchedulePriority, setEventSchedulePriority] = useState([]);
  const [colorList, setColorList] = useState({});

  const [textColorList, setTextColorList] = useState(colorList);

  useEffect(() => {
    if (Object.keys(eventList).length > 0) {
      setEventScheduleNormal(eventList[Object.keys(eventList)[0]].normal);
      setEventSchedulePriority(eventList[Object.keys(eventList)[0]].priority);
      const tempColorList = {};
      tempColorList[Object.keys(eventList)[0]] = '#1F5A18';
      for (let i = 1; i < Object.keys(eventList).length; i += 1) {
        tempColorList[Object.keys(eventList)[i]] = '#01A494';
      }
      setColorList(tempColorList);
    }
  }, [eventList]);

  const clickButton = () => {
    setIsModalVisible(true);
  };

  const clickApple = () => {
    setIsModalVisible(false);
    setIsAppleVisible(true);
    setAppleConnect(true);
  };

  const clickGoogle = () => {
    setIsModalVisible(false);
    setIsGoogleVisible(true);
    setGoogleConnect(true);
  };

  const clickEvent = async () => {
    // 接後端所有 events preview 狀況並 setEventList
    message.warning('Getting event info...', 1);
    const res = await getImportEventsInfo();
    if (res.status === 'success') {
      setEventList(Object.assign({}, ...res.data.filter((event) => event.event_id !== Number(eventID)).map((event) => ({
        [event.event_id]: {
          normal: event.normal ? event.normal.map((timeblock) => new Date(timeblock)) : [],
          priority: event.priority ? event.priority.map((timeblock) => new Date(timeblock)) : [],
          name: event.event_name,
        },
      }))));
      if (res.data.length > 0) {
        setIsModalVisible(false);
        setIsEventVisible(true);
      } else message.error('There are currently no other events!', 1.5);
    }
  };

  const changeEvent = (event) => {
    setEventScheduleNormal(eventList[event].normal);
    setEventSchedulePriority(eventList[event].priority);
    for (let i = 0; i < Object.keys(eventList).length; i += 1) {
      colorList[Object.keys(eventList)[i]] = '#01A494';
    }
    colorList[event] = '#1F5A18';
    setTextColorList(colorList);
    setEventChosen(event);
  };

  return (
    <>
      <Button className="button-round" icon={<DownloadOutlined />} onClick={clickButton}>
        Import Calendar
      </Button>
      <Modal
        visible={isModalVisible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              height: '150px', width: '25%', border: '1px solid #B8B8B8', borderRadius: '8px', cursor: 'pointer',
            }}
            onClick={clickApple}
          >
            <AppleFilled style={{ fontSize: '50px', marginTop: '30px', marginLeft: '64px' }} />
            <p style={{ marginTop: '10px', marginLeft: '40px' }}>Apple Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '25%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px', cursor: 'pointer',
            }}
            onClick={clickGoogle}
          >
            <Icon icon="flat-color-icons:google" width="50px" style={{ marginTop: '35px', marginLeft: '65px' }} />
            <p style={{ marginLeft: '36px' }}>Google Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '45%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px', cursor: 'pointer',
            }}
            onClick={clickEvent}
          >
            <img src={logo} alt="logo" style={{ height: '60px', marginTop: '30px', marginLeft: '15px' }} />
            <p style={{ marginLeft: '86px' }}>Thundermeet Calendar</p>
          </div>
        </div>
      </Modal>
      <Modal
        visible={isAppleVisible}
        okText="Confirm"
        onCancel={() => {
          setIsAppleVisible(false);
        }}
        onOk={() => {
          setIsAppleVisible(false);
          setAppleConfirm(true);
        }}
        width={600}
      >
        { enablePriority
          ? <CalendarForImport schedulePriority={appleSchedule} scheduleNormal={[]} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
          : <CalendarForImport scheduleNormal={appleSchedule} schedulePriority={[]} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />}
        <p style={{ marginLeft: '400px', fontSize: '18px' }}>coming soon...</p>
      </Modal>
      <Modal
        visible={isGoogleVisible}
        okText="Confirm"
        onCancel={() => {
          setIsGoogleVisible(false);
        }}
        onOk={() => {
          setIsGoogleVisible(false);
          setGoogleConfirm(true);
        }}
        width={600}
      >
        { enablePriority
          ? <CalendarForImport schedulePriority={googleSchedule} scheduleNormal={[]} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
          : <CalendarForImport scheduleNormal={googleSchedule} schedulePriority={[]} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />}
      </Modal>
      <Modal
        visible={isEventVisible}
        okText="Confirm"
        onCancel={() => {
          setIsEventVisible(false);
        }}
        onOk={() => {
          setIsEventVisible(false);
          setEventConfirm(eventChosen);
        }}
        width={700}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', width: '110px', marginTop: '33px', marginLeft: '17px',
          }}
          >
            {Object.keys(eventList).map((event) => (
              <p style={{ marginTop: '5px', color: textColorList[event], fontWeight: 'bold' }} onClick={() => changeEvent(event)}>{eventList[event].name}</p>
            ))}
          </div>
          <div style={{
            border: '1px solid #EDEDED', height: '520px', width: '1px', marginTop: '33px',
          }}
          />
          <CalendarForImport scheduleNormal={eventScheduleNormal} schedulePriority={eventSchedulePriority} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
        </div>
      </Modal>
    </>
  );
}
