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
import confirmTime from '../../utils/confirmTime';
import getAllTimeBlocksInfo from '../../utils/getAllTimeBlocksInfo';
import getEvent from '../../utils/getEvent';
import getNumberOfDays from '../../utils/getNumberOfDays';

import './ConfirmTimePage.css';

export default function ConfirmTimePage() {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const { status, data } = await getEvent(eventID);
      if (!localStorage.getItem('token') || data.admin_id !== localStorage.getItem('userID')) {
        message.error('You are not the creator of the event!', 2);
        navigate(`/event-time/${eventID}`);
        return;
      }
      if (status === 'error') {
        message.error('Cannot find this event!', 1.5);
        navigate('/personal');
        return;
      }
      if (data.is_confirmed) {
        navigate(`/final-time/${eventID}`);
        return;
      }
      console.log(data);
      setEnablePriority(data.is_priority_enabled);
      setNumOfDays(getNumberOfDays(data.start_date, data.end_date));
      setStartDate(new Date(data.start_date));
      setStartTime(Number(data.start_time.substring(0, 2)));
      setEndTime(Number(data.end_time.substring(0, 2)));
      setEventDescription(data.event_description);
      setEventTitle(data.event_name);
      setCopyLink(`${import.meta.env.VITE_FRONTEND_URL}/event-time/${eventID}`);
      if (data.groups) {
        setTagList(data.groups.map((groupObj) => groupObj.GroupName));
        setGroups(data.groups.map((groupObj) => groupObj.GroupId));
      }
      const timeblocksRes = await getAllTimeBlocksInfo(eventID);
      setLoading(false);
      // console.log(timeblocksRes.info);
      if (timeblocksRes.status === 'success') {
        setSelectedList(timeblocksRes.info);
        setMemberList(timeblocksRes.memberList);
      } else message.error('Fail to get event info!', 2);
    })();
  }, []);
  const cancelAction = () => {
    navigate(`/event-time/${eventID}`);
  };

  const confirmAction = async () => {
    // API confirm timeblocks
    if (schedule.length >= 1) {
      const status = await confirmTime(eventID, schedule);
      if (status === 'success') {
        message.success('Event time has been decided!', 1.5);
        navigate(`/final-time/${eventID}`);
      } else {
        message.error('Fail to confirm time!', 1.5);
      }
    } else {
      message.error('Please select at least one time slot!', 1.5);
    }
  };

  const editButton = () => {
    navigate(`/edit-event/${eventID}`);
  };

  return (
    <>
      <Navbar />
      {loading ? <Spin style={{ marginLeft: '50vw', marginTop: '40vh', backgroundColor: 'white' }} /> : (
        <div style={{ minHeight: '92vh', background: '#F8F8F8' }}>
          <span style={{ marginLeft: '60%' }}>
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
