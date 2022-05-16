/* eslint-disable no-unused-vars */
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
import { format } from 'date-fns';

import Calendar from '../../components/Calendar/Calendar';
import CalendarForDisplay from '../../components/CalendarForDisplay/CalendarForDisplay';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyLink from '../../components/EventCopyLink/EventCopyLink';
import ImportButton from '../../components/ImportButton/ImportButton';
import Navbar from '../../components/Navbar/Navbar';
import fillTimeBlocks from '../../utils/fillTimeBlocks';
import getEvent from '../../utils/getEvent';
import getNumberOfDays from '../../utils/getNumberOfDays';

import './EventTimePage.css';

export default function EventTimePage() {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // params
  const [adminID, setAdminID] = useState('');
  const [eventTitle, setEventTitle] = useState('Title');
  const tagList = ['SAD', 'milestone2']; // 這個可能要想一下怎麼拿 因為 GET event 不會回傳這個 event 屬於這個人的哪些 group
  const [eventDescription, setEventDescription] = useState('description');
  const [startTime, setStartTime] = useState(0); // start hour
  const [endTime, setEndTime] = useState(6); // end hour
  const [startDate, setStartDate] = useState(new Date(2022, 4, 2));
  const [numOfDays, setNumOfDays] = useState(7); // continue number of days(for both weekday & date)
  const [copyLink, setCopyLink] = useState('');
  // params for left
  const [enablePriority, setEnablePriority] = useState(true); // creator enable priority or not
  const [exportTime, setExportTime] = useState([new Date(2022, 4, 3, 0, 0, 0), new Date(2022, 4, 3, 0, 30, 0)]); // when user export other event's specific time here
  // output for left(2 arrays & user_id)
  const [click, setClick] = useState(false);
  const [normalDay, setNormalDay] = useState([]);
  const [priorityDay, setPriorityDay] = useState([]);
  // -----
  const [schedule, setSchedule] = useState([]);
  // 這段比較特別：若要讓左邊拖曳記住狀態：setSchedule(normalDay+priorityDay) ，setPriorityDay(priorityDay)，setNormalDay(normalDay)
  // 因為邏輯是 schedule 代表所有選取時間，priority 則是我加顏色上去的時間
  // schedule(所選時間) = normal + priority
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
  const [appleConnect, setAppleConnect] = useState(false); // set true when user click apple import, @郭 接完以後設成 false
  // const appleSchedule = [new Date(2022, 4, 5, 2, 0, 0), new Date(2022, 4, 4, 1, 30, 0), new Date(2022, 4, 6, 1, 30, 0), new Date(2022, 4, 3, 2, 0, 0), new Date(2022, 4, 3, 2, 30, 0), new Date(2022, 4, 7, 2, 0, 0), new Date(2022, 4, 7, 2, 30, 0), new Date(2022, 4, 4, 3, 0, 0), new Date(2022, 4, 4, 3, 30, 0), new Date(2022, 4, 6, 3, 0, 0), new Date(2022, 4, 6, 3, 30, 0), new Date(2022, 4, 5, 4, 0, 0)]; // heart style
  const appleSchedule = [new Date(2022, 4, 6, 1, 0, 0), new Date(2022, 4, 5, 1, 30, 0), new Date(2022, 4, 4, 2, 0, 0), new Date(2022, 4, 4, 2, 30, 0), new Date(2022, 4, 5, 2, 30, 0), new Date(2022, 4, 6, 2, 30, 0), new Date(2022, 4, 6, 3, 0, 0), new Date(2022, 4, 5, 3, 30, 0), new Date(2022, 4, 4, 4, 0, 0)];
  // params for import from google calendar
  const [googleConnect, setGoogleConnect] = useState(false); // set true when user click google import, @郭 接完以後設成 false
  const googleSchedule = [new Date(2022, 4, 5, 2, 0, 0), new Date(2022, 4, 5, 2, 30, 0)];
  // params for import from event
  const [eventConnect, setEventConnect] = useState(false); // set true when user click event import, @郭 接完以後設成 false
  const eventList = {};
  eventList['SAD-1'] = {
    normal: [new Date(2022, 4, 4, 0, 0, 0), new Date(2022, 4, 4, 0, 30, 0)],
    priority: [new Date(2022, 4, 4, 1, 0, 0), new Date(2022, 4, 4, 1, 30, 0)],
  };
  eventList['SAD-2'] = {
    normal: [new Date(2022, 4, 8, 0, 0, 0), new Date(2022, 4, 8, 0, 30, 0)],
    priority: [new Date(2022, 4, 8, 1, 0, 0), new Date(2022, 4, 8, 1, 30, 0)],
  };
  eventList['SAD-3'] = {
    normal: [new Date(2022, 4, 5, 0, 0, 0), new Date(2022, 4, 5, 0, 30, 0)],
    priority: [new Date(2022, 4, 5, 1, 0, 0), new Date(2022, 4, 5, 1, 30, 0)],
  };

  // when loading into this page, 接此 event 的基本資訊
  useEffect(() => {
    (async () => {
      const { data } = await getEvent(eventID);
      setLoading(false);
      console.log(data);
      setNumOfDays(getNumberOfDays(data.start_date, data.end_date));
      setStartDate(new Date(data.start_date));
      setStartTime(Number(data.start_time.substring(0, 2)));
      setEndTime(Number(data.end_time.substring(0, 2)));
      setEventDescription(data.event_description);
      setEventTitle(data.event_name);
      setCopyLink(`Please fill in avaliable time for ${eventTitle} in the follwing link! http://localhost:3000/edit-event/${eventID}`);
      setEnablePriority(data.is_priority_enabled);
      setAdminID(data.admin_id);
      // 要 set 左邊最近一次的填寫狀況 (maybe call preview?)
    })();
  }, []);

  // POST when user fills timeblocks
  useEffect(() => {
    if (normalDay.length > 0 || priorityDay.length > 0) {
      // (async () => {
      //   const res = await fillTimeBlocks(Number(eventID), enablePriority, normalDay, priorityDay);
      //   if (res.status === 'success') message.success('已成功更新填寫狀況！', 1.2);
      //   else message.error('無法更新填寫狀況，請再嘗試！', 1.2);
      // })();
      console.log(`${format(new Date(normalDay[0]), "yyyy-MM-dd'T'HH:mm:ss")}+08:00`);
    }
    console.log('normal:', normalDay);
    console.log('priority:', priorityDay);
    // console.log('selected:', schedule);
  }, [normalDay, priorityDay]);

  const confirmDate = () => {
    navigate('/confirm-time');
  };

  const editButton = () => {
    navigate('/edit-event');
  };

  const [appleConfirm, setAppleConfirm] = useState(false);
  const [googleConfirm, setGoogleConfirm] = useState(false);
  const [eventConfirm, setEventConfirm] = useState('');

  const [appleReverse, setAppleReverse] = useState([]);
  const [googleReverse, setGoogleReverse] = useState([]);

  const [timeList, setTimeList] = useState([]);

  useEffect(() => {
    // @ 郭 接在這裡(用 setGoogleSchedule)
    const arr = [];
    for (let i = 0; i < googleSchedule.length; i += 1) {
      arr[i] = googleSchedule[i].getTime();
    }
    if (googleConnect) {
      setGoogleReverse(timeList.filter((item) => !arr.includes(item.getTime())));
    }
    // @ 郭 接完後 setGoogleConnect(false);
  }, [googleConnect]);

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
      setSchedule(timeList.filter((item) => !arr.includes(item.getTime())));
      if (enablePriority) setPriorityDay(timeList.filter((item) => !arr.includes(item.getTime())));
      else setNormalDay(timeList.filter((item) => !arr.includes(item.getTime())));
      setGoogleConfirm(false);
    }
  }, [googleConfirm]);

  useEffect(() => {
    if (eventConfirm.length !== 0) {
      setSchedule(eventList[eventConfirm].normal.concat(eventList[eventConfirm].priority));
      if (enablePriority) {
        setPriorityDay(eventList[eventConfirm].priority);
        setNormalDay(eventList[eventConfirm].normal);
      } else setNormalDay(eventList[eventConfirm].normal.concat(eventList[eventConfirm].priority));
      setEventConfirm('');
    }
  }, [eventConfirm]);

  return (
    <>
      <Navbar />
      {loading ? <Spin className="spin" style={{ marginLeft: '50vw', marginTop: '40vh' }} /> : (
        <div style={{ height: '92vh', background: '#F8F8F8' }}>
          <span style={{ marginLeft: '55%' }}>
            <ImportButton appleSchedule={appleReverse} googleSchedule={googleReverse} eventList={eventList} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} setAppleConnect={setAppleConnect} setGoogleConnect={setGoogleConnect} setEventConnect={setEventConnect} setAppleConfirm={setAppleConfirm} setGoogleConfirm={setGoogleConfirm} setEventConfirm={setEventConfirm} enablePriority={enablePriority} />
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
            <Calendar schedule={schedule} setSchedule={setSchedule} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} enablePriority={enablePriority} normalDay={normalDay} setNormalDay={setNormalDay} priorityDay={priorityDay} setPriorityDay={setPriorityDay} exportTime={exportTime} setTimeList={setTimeList} setClick={setClick} />
            <CalendarForDisplay startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} />
            {adminID === localStorage.getItem('userID')
              && (
              <Button
                style={{
                  marginTop: '510px', marginLeft: '-30px', background: '#01A494', color: 'white',
                }}
                icon={<ArrowRightOutlined />}
                onClick={confirmDate}
              >
                Confirm Date
              </Button>
              )}
          </div>
        </div>
      )}
    </>
  );
}
