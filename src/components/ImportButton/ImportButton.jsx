/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import {
  AppleFilled, DownloadOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Modal,
} from 'antd';

import logo from '../../icons/logo.png';
import CalendarForImport from '../CalendarForImport/CalendarForImport';

import './ImportButton.css';

export default function ImportButton({
  appleSchedule, googleSchedule, eventList, startTime, endTime, type, startDate, numOfDays, setAppleConnect, setGoogleConnect, setEventConnect, setAppleConfirm, setGoogleConfirm, setEventConfirm,
}) {
  const [eventChosen, setEventChosen] = useState(Object.keys(eventList)[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppleVisible, setIsAppleVisible] = useState(false);
  const [isGoogleVisible, setIsGoogleVisible] = useState(false);
  const [isEventVisible, setIsEventVisible] = useState(false);
  const [eventSchedule, setEventSchedule] = useState(eventList[Object.keys(eventList)[0]]);
  const colorList = {};
  colorList[Object.keys(eventList)[0]] = '#1F5A18';
  for (let i = 1; i < Object.keys(eventList).length; i += 1) {
    colorList[Object.keys(eventList)[i]] = '#01A494';
  }
  const [textColorList, setTextColorList] = useState(colorList);

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

  const clickEvent = () => {
    setIsModalVisible(false);
    setIsEventVisible(true);
    setEventConnect(true);
  };

  const changeEvent = (event) => {
    setEventSchedule(eventList[event]);
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
              height: '150px', width: '25%', border: '1px solid #B8B8B8', borderRadius: '8px',
            }}
            onClick={clickApple}
          >
            <AppleFilled style={{ fontSize: '50px', marginTop: '30px', marginLeft: '64px' }} />
            <p style={{ marginTop: '10px', marginLeft: '40px' }}>Apple Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '25%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px',
            }}
            onClick={clickGoogle}
          >
            <Icon icon="flat-color-icons:google" width="50px" style={{ marginTop: '35px', marginLeft: '65px' }} />
            <p style={{ marginLeft: '36px' }}>Google Calendar</p>
          </div>
          <div
            style={{
              height: '150px', width: '45%', border: '1px solid #B8B8B8', marginLeft: '10px', borderRadius: '8px',
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
        <CalendarForImport schedule={appleSchedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
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
        <CalendarForImport schedule={googleSchedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
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
              <p style={{ marginTop: '5px', color: textColorList[event], fontWeight: 'bold' }} onClick={() => changeEvent(event)}>{event}</p>
            ))}
          </div>
          <div style={{
            border: '1px solid #EDEDED', height: '520px', width: '1px', marginTop: '33px',
          }}
          />
          <CalendarForImport schedule={eventSchedule} startTime={startTime} endTime={endTime} type={type} startDate={startDate} numOfDays={numOfDays} />
        </div>
      </Modal>
    </>
  );
}
