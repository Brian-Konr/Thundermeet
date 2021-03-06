/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, message, Spin, Tag,
} from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import CalendarForDisplay from '../../components/CalendarForDisplay/CalendarForDisplay';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyLink from '../../components/EventCopyLink/EventCopyLink';
import HomeCard from '../../components/HomeCard/HomeCard';
import ImportButton from '../../components/ImportButton/ImportButton';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../icons/logo.png';
import calendarToTimeblocks from '../../utils/calendarToTimeblocks';
import fillTimeBlocks from '../../utils/fillTimeBlocks';
import getAllTimeBlocksInfo from '../../utils/getAllTimeBlocksInfo';
import getEvent from '../../utils/getEvent';
import getNumberOfDays from '../../utils/getNumberOfDays';
import getPreviewTimeblocks from '../../utils/getPreviewTimeblocks';
import getGoogleCalendarResponse from '../../utils/googleConnect';

import './EventTimePage.css';

export default function EventTimePage() {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [homeCardLoading, setHomeCardLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rightLoading, setRightLoading] = useState(true);
  const [rightSpinLoading, setRightSpinLoading] = useState(true);
  // params
  const [adminID, setAdminID] = useState('');
  const [groups, setGroups] = useState([]);
  const [eventTitle, setEventTitle] = useState('Title');
  const [tagList, setTagList] = useState([]);
  const [eventDescription, setEventDescription] = useState('description');
  const [startTime, setStartTime] = useState(0); // start hour
  const [endTime, setEndTime] = useState(6); // end hour
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfDays, setNumOfDays] = useState(0); // continue number of days(for both weekday & date)
  const [copyLink, setCopyLink] = useState('');
  // params for left
  const [enablePriority, setEnablePriority] = useState(true); // creator enable priority or not
  // output for left(2 arrays & user_id)
  const [click, setClick] = useState(false);
  const [normalDay, setNormalDay] = useState([]);
  const [priorityDay, setPriorityDay] = useState([]);
  // -----
  const [schedule, setSchedule] = useState([]);
  // ?????????????????????????????????????????????????????????setSchedule(normalDay+priorityDay) ???setPriorityDay(priorityDay)???setNormalDay(normalDay)
  // ??????????????? schedule ???????????????????????????priority ?????????????????????????????????
  // schedule(????????????) = normal + priority
  // -----
  const [memberList, setMemberList] = useState([]);
  const [selectedList, setSelectedList] = useState({}); // should include all time block(here for display only few timeblocks)
  // params for import from apple calendar
  const [appleConnect, setAppleConnect] = useState(false); // set true when user click apple import, @??? ?????????????????? false
  // const appleSchedule = [new Date(2022, 4, 5, 2, 0, 0), new Date(2022, 4, 4, 1, 30, 0), new Date(2022, 4, 6, 1, 30, 0), new Date(2022, 4, 3, 2, 0, 0), new Date(2022, 4, 3, 2, 30, 0), new Date(2022, 4, 7, 2, 0, 0), new Date(2022, 4, 7, 2, 30, 0), new Date(2022, 4, 4, 3, 0, 0), new Date(2022, 4, 4, 3, 30, 0), new Date(2022, 4, 6, 3, 0, 0), new Date(2022, 4, 6, 3, 30, 0), new Date(2022, 4, 5, 4, 0, 0)]; // heart style
  const appleSchedule = [new Date(2022, 5, 4, 11, 0, 0), new Date(2022, 5, 3, 11, 30, 0), new Date(2022, 5, 2, 12, 0, 0), new Date(2022, 5, 2, 12, 30, 0), new Date(2022, 5, 3, 12, 30, 0), new Date(2022, 5, 4, 12, 30, 0), new Date(2022, 5, 4, 13, 0, 0), new Date(2022, 5, 3, 13, 30, 0), new Date(2022, 5, 2, 14, 0, 0)];
  // params for import from google calendar
  const [googleConnect, setGoogleConnect] = useState(false); // set true when user click google import, @??? ?????????????????? false
  const [googleSchedule, setGoogleSchedule] = useState([]);
  // params for import from event
  const [eventList, setEventList] = useState({});

  const fetchRight = async () => {
    setRightSpinLoading(true);
    const timeblocksRes = await getAllTimeBlocksInfo(eventID);
    if (timeblocksRes.status === 'success') {
      setSelectedList(timeblocksRes.info);
      setMemberList(timeblocksRes.memberList);
    } else message.error('Fail to get event info!', 2);
    setRightLoading(false);
    setRightSpinLoading(false);
  };

  // params for POST timeblocks check
  const [startDateParam, setStartDateParam] = useState('');
  const [endDateParam, setEndDateParam] = useState('');

  // when loading into this page, ?????? event ???????????????
  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const { status, data } = await getEvent(eventID);
        if (status === 'error') {
          message.error('Cannot find this event!', 1.5);
          navigate('/personal');
          return;
        }
        if (data.is_confirmed) {
          navigate(`/final-time/${eventID}`);
          return;
        }
        setNumOfDays(getNumberOfDays(data.start_date, data.end_date));
        setStartDateParam(data.start_date);
        setStartDate(new Date(data.start_date));
        setEndDateParam(data.end_date);
        setEndDate(new Date(data.end_date));
        setStartTime(Number(data.start_time.substring(0, 2)));
        setEndTime(Number(data.end_time.substring(0, 2)));
        setEventDescription(data.event_description);
        setEventTitle(data.event_name);
        setCopyLink(`${import.meta.env.VITE_FRONTEND_URL}/event-time/${eventID}`);
        setEnablePriority(data.is_priority_enabled);
        if (data.groups) {
          setTagList(data.groups.map((groupObj) => groupObj.GroupName));
          setGroups(data.groups.map((groupObj) => groupObj.GroupId));
        }
        setAdminID(data.admin_id);
        const res = await getPreviewTimeblocks(eventID);
        setLoading(false);
        if (res.status === 'success') {
          // ??? set ?????????????????????????????????
          if (res.normal.length > 0) setNormalDay(res.normal.map((timeblock) => new Date(timeblock)));
          if (data.is_priority_enabled && (res.priority.length > 0)) setPriorityDay(res.priority.map((timeblock) => new Date(timeblock)));
          setSchedule(res.concat.map((timeblock) => new Date(timeblock)));
        } else message.error('Fail to get recent fill in info!', 2);
        fetchRight();
      })();
    }
  }, []);

  // POST when user fills timeblocks
  useEffect(() => {
    if (click) {
      (async () => {
        const res = await fillTimeBlocks(Number(eventID), enablePriority, normalDay, priorityDay, startDateParam, startTime, endDateParam, endTime);
        if (res.status === 'success') {
          fetchRight();
        } else message.error('Fail to update, please try again!', 1.2);
      })();
      setClick(false);
    }
  }, [normalDay, priorityDay]);

  const editButton = () => {
    navigate(`/edit-event/${eventID}`);
  };

  const [appleConfirm, setAppleConfirm] = useState(false);
  const [googleConfirm, setGoogleConfirm] = useState(false);
  const [eventConfirm, setEventConfirm] = useState('');

  const [appleReverse, setAppleReverse] = useState([]);
  const [googleReverse, setGoogleReverse] = useState([]);

  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    if (googleConnect) {
      (async () => {
        const wideRangeStart = new Date(startDate.getTime() - 86400000);
        const wideRangeEnd = new Date(endDate.getTime() + 86400000);
        const res = await getGoogleCalendarResponse(wideRangeStart.toISOString(), wideRangeEnd.toISOString()); // ?????? min, max ??????
        console.log(res);
        const resAfterTransform = calendarToTimeblocks(res, startDateParam, startTime, endDateParam, endTime);
        console.log(resAfterTransform);
        setGoogleSchedule(resAfterTransform);
      })();
      // @ ??? ????????????(??? setGoogleSchedule)
    }
    // @ ??? ????????? setGoogleConnect(false);
  }, [googleConnect]);

  useEffect(() => {
    if (googleConnect) setGoogleConnect(false);
    if (googleSchedule.length > 0) {
      const arr = [];
      for (let i = 0; i < googleSchedule.length; i += 1) {
        arr[i] = googleSchedule[i].getTime();
      }
      setGoogleReverse(timeList.filter((item) => !arr.includes(item.getTime())));
    }
  }, [googleSchedule]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < appleSchedule.length; i += 1) {
      arr[i] = appleSchedule[i].getTime();
    }
    if (appleConnect) {
      setAppleReverse(timeList.filter((item) => !arr.includes(item.getTime())));
    }
    setAppleConnect(false);
  }, [appleConnect]);

  useEffect(() => {
    if (appleConfirm) {
      const arr = [];
      for (let i = 0; i < appleSchedule.length; i += 1) {
        arr[i] = appleSchedule[i].getTime();
      }
      setNormalDay([]);
      setPriorityDay([]);
      setSchedule(timeList.filter((item) => !arr.includes(item.getTime())));
      if (enablePriority) setPriorityDay(timeList.filter((item) => !arr.includes(item.getTime())));
      else setNormalDay(timeList.filter((item) => !arr.includes(item.getTime())));
      setAppleConfirm(false);
    }
  }, [appleConfirm]);

  useEffect(() => {
    if (googleConfirm) {
      const arr = [];
      for (let i = 0; i < googleSchedule.length; i += 1) {
        arr[i] = googleSchedule[i].getTime();
      }
      setNormalDay([]);
      setPriorityDay([]);
      setSchedule(timeList.filter((item) => !arr.includes(item.getTime())));
      if (enablePriority) setPriorityDay(timeList.filter((item) => !arr.includes(item.getTime())));
      else setNormalDay(timeList.filter((item) => !arr.includes(item.getTime())));
      setGoogleConfirm(false);
      setClick(true);
    }
  }, [googleConfirm]);

  useEffect(() => {
    if (eventConfirm.length > 0) {
      setNormalDay([]);
      setPriorityDay([]);
      setSchedule(eventList[eventConfirm].normal.concat(eventList[eventConfirm].priority));
      if (enablePriority) {
        setPriorityDay(eventList[eventConfirm].priority);
        setNormalDay(eventList[eventConfirm].normal);
      } else setNormalDay(eventList[eventConfirm].normal.concat(eventList[eventConfirm].priority));
      setClick(true);
    }
  }, [eventConfirm]);

  return (
    localStorage.getItem('token') ? (
      <>
        <Navbar />
        {loading ? <Spin className="spin" style={{ marginLeft: '50vw', marginTop: '40vh', backgroundColor: 'transparent' }} /> : (
          <div style={{ minHeight: '92vh', background: '#F8F8F8' }}>
            <span style={{ marginLeft: '50%' }}>
              <ImportButton
                appleSchedule={appleReverse}
                googleSchedule={googleReverse}
                eventList={eventList}
                setEventList={setEventList}
                startTime={startTime}
                endTime={endTime}
                startDate={startDate}
                numOfDays={numOfDays}
                setAppleConnect={setAppleConnect}
                setGoogleConnect={setGoogleConnect}
                setAppleConfirm={setAppleConfirm}
                setGoogleConfirm={setGoogleConfirm}
                setEventConfirm={setEventConfirm}
                enablePriority={enablePriority}
                eventID={eventID}
              />
              <EventAddToGroup eventID={eventID} groupsAlreadyIn={groups} setTagList={setTagList} setGroups={setGroups} />
              <EventCopyLink eventName={eventTitle} copyLink={copyLink} />
            </span>
            <div style={{ width: '92%', marginLeft: '4%' }}>
              <span>
                <h1 style={{ fontWeight: 'bold', display: 'inline-block' }}>{eventTitle}</h1>
                <Icon icon="akar-icons:edit" width="25px" style={{ marginLeft: '78%' }} onClick={editButton} className="pointer" />
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
              <Calendar schedule={schedule} setSchedule={setSchedule} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} enablePriority={enablePriority} normalDay={normalDay} setNormalDay={setNormalDay} priorityDay={priorityDay} setPriorityDay={setPriorityDay} setTimeList={setTimeList} setClick={setClick} />
              {rightSpinLoading && (
              <Spin
                className="spin"
                style={{
                  position: 'fixed', marginLeft: '82vw', marginTop: '5vh', backgroundColor: 'transparent',
                }}
              />
              )}
              {!rightLoading && (
                <CalendarForDisplay
                  startTime={startTime}
                  endTime={endTime}
                  startDate={startDate}
                  numOfDays={numOfDays}
                  memberList={memberList}
                  selectedList={selectedList}
                  enablePriority={enablePriority}
                />
              )}
              {adminID === localStorage.getItem('userID')
                && (
                <Button
                  style={{
                    marginTop: '510px', marginLeft: '-30px', background: '#01A494', color: 'white',
                  }}
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate(`/confirm-time/${eventID}`)}
                >
                  Confirm Date
                </Button>
                )}
            </div>
          </div>
        )}
      </>
    ) : (
      <div style={{ width: '300px', paddingLeft: '35vw', paddingTop: '15vh' }}>
        <img src={logo} alt="logo" style={{ width: '300px', marginLeft: '4vw' }} />
        {homeCardLoading ? <Spin className="spin" style={{ marginLeft: '15vw', marginTop: '30vh', backgroundColor: 'transparent' }} /> : (
          <HomeCard loading={homeCardLoading} setLoading={setHomeCardLoading} atHome={false} />
        )}
      </div>
    )
  );
}
