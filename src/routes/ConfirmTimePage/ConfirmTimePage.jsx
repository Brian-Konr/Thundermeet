/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Button, message,
  Spin,
  Tag,
} from 'antd';

import CalendarForConfirm from '../../components/CalendarForConfirm/CalendarForConfirm';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyLink from '../../components/EventCopyLink/EventCopyLink';
import Navbar from '../../components/Navbar/Navbar';
import getAllTimeBlocksInfo from '../../utils/getAllTimeBlocksInfo';
import getEvent from '../../utils/getEvent';
import getNumberOfDays from '../../utils/getNumberOfDays';

import './ConfirmTimePage.css';

export default function ConfirmTimePage() {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [loading, setLoading] = useState(true);
  const [adminID, setAdminID] = useState('');

  // params
  const [eventTitle, setEventTitle] = useState('');
  const [tagList, setTagList] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [startTime, setStartTime] = useState(0); // start hour
  const [endTime, setEndTime] = useState(6); // end hour
  const [startDate, setStartDate] = useState(new Date()); // start date(if weekday, weekday switch to the nearest date)
  const [numOfDays, setNumOfDays] = useState(0); // continue number of days(for both weekday & date)
  const [copyLink, setCopyLink] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [enablePriority, setEnablePriority] = useState(true); // creator enable priority or not
  // output
  const [schedule, setSchedule] = useState([]);
  // output for add to category
  const [selectedGroup, setSelectedGroup] = useState(''); // store selected group's name
  // params for add to category
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getEvent(eventID);
      if (!localStorage.getItem('token') || data.admin_id !== localStorage.getItem('userID')) {
        message.error('您並非該活動的創建者！', 2);
        navigate(`/event-time/${eventID}`);
        return;
      }
      console.log(data);
      setNumOfDays(getNumberOfDays(data.start_date, data.end_date));
      setStartDate(new Date(data.start_date));
      setStartTime(Number(data.start_time.substring(0, 2)));
      setEndTime(Number(data.end_time.substring(0, 2)));
      setEventDescription(data.event_description);
      setEventTitle(data.event_name);
      setCopyLink(`http://localhost:3000/event-time/${eventID}`);
      if (data.groups) {
        setTagList(data.groups.map((groupObj) => groupObj.GroupName));
      }
      setAdminID(data.admin_id);
      const timeblocksRes = await getAllTimeBlocksInfo(eventID);
      setLoading(false);
      console.log(timeblocksRes.info);
      if (timeblocksRes.status === 'success') {
        setSelectedList(timeblocksRes.info);
        setMemberList(timeblocksRes.memberList);
      } else message.error('無法取得各填寫者的填寫資訊！', 2);
    })();
  }, []);
  const cancelAction = () => {
    navigate('/event-time');
  };

  const confirmAction = () => {
    if (schedule.length >= 1) {
      navigate('/final-time');
    } else {
      message.error('must select at least a period of time');
    }
  };

  const editButton = () => {
    navigate(`/edit-event/${eventID}`);
  };

  return (
    <>
      <Navbar />
      {loading ? <Spin style={{ marginLeft: '50vw', marginTop: '40vh', backgroundColor: 'white' }} /> : (
        <div style={{ height: '92vh', background: '#F8F8F8' }}>
          <span style={{ marginLeft: '60%' }}>
            <EventAddToGroup setSelectedGroup={setSelectedGroup} groupList={groupList} />
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
          <div className="container-confirm">
            <CalendarForConfirm schedule={schedule} setSchedule={setSchedule} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} enablePriority={enablePriority} />
            <Button
              style={{
                marginTop: '510px', marginLeft: '210px',
              }}
              onClick={cancelAction}
            >
              Cancel
            </Button>
            <Button
              style={{
                marginTop: '510px', marginLeft: '15px', background: '#01A494', color: 'white',
              }}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
