/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  message, Spin,
  Tag,
} from 'antd';

import CalendarForFinal from '../../components/CalendarForFinal/CalendarForFinal';
import EventAddToGroup from '../../components/EventAddToGroup/EventAddToGroup';
import EventCopyConfirmLink from '../../components/EventCopyConfirmLink/EventCopyConfirmLink';
import ExportButton from '../../components/ExportButton/ExportButton';
import HomeCard from '../../components/HomeCard/HomeCard';
import Navbar from '../../components/Navbar/Navbar';
import getAllTimeBlocksInfo from '../../utils/getAllTimeBlocksInfo';
import getEvent from '../../utils/getEvent';
import getNumberOfDays from '../../utils/getNumberOfDays';

import './FinalTimePage.css';

export default function FinalTimePage() {
  const { eventID } = useParams();
  // params
  const [homeCardLoading, setHomeCardLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventTitle, setEventTitle] = useState('');
  const [tagList, setTagList] = useState([]);
  const [eventDescription, setEventDescription] = useState('');
  const [startTime, setStartTime] = useState(0); // start hour
  const [endTime, setEndTime] = useState(6); // end hour
  const [startDate, setStartDate] = useState(new Date()); // start date(if weekday, weekday switch to the nearest date)
  const [numOfDays, setNumOfDays] = useState(0); // continue number of days(for both weekday & date)
  const [memberList, setMemberList] = useState([]);
  const [copyLink, setCopyLink] = useState('https://thundermeet');
  const [enablePriority, setEnablePriority] = useState(true); // creator enable priority or not
  const [selectedList, setSelectedList] = useState({});
  const [schedule, setSchedule] = useState({}); // final chosen time list
  const [groups, setGroups] = useState([]);
  // params for export

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        const { data } = await getEvent(eventID);
        console.log(data);
        setMemberList(data.participants);
        setSchedule(data.confirmed_timeblocks.map((timeblock) => new Date(timeblock)));
        setEnablePriority(data.is_priority_enabled);
        setNumOfDays(getNumberOfDays(data.start_date, data.end_date));
        setStartDate(new Date(data.start_date));
        setStartTime(Number(data.start_time.substring(0, 2)));
        setEndTime(Number(data.end_time.substring(0, 2)));
        setEventDescription(data.event_description);
        setEventTitle(data.event_name);
        setCopyLink(`http://localhost:3000/final-time/${eventID}`);
        if (data.groups) {
          setTagList(data.groups.map((groupObj) => groupObj.GroupName));
          setGroups(data.groups.map((groupObj) => groupObj.GroupId));
        }
        const timeblocksRes = await getAllTimeBlocksInfo(eventID);
        // console.log(timeblocksRes.info);
        if (timeblocksRes.status === 'success') {
          setSelectedList(timeblocksRes.info);
        } else message.error('Fail to get event info!', 2);
        setLoading(false);
      })();
    }
  }, []);
  return (
    localStorage.getItem('token') ? (
      <>
        <Navbar />
        {loading ? <Spin /> : (
          <div style={{ minHeight: '92vh', background: '#F8F8F8' }}>
            <span style={{ marginLeft: '55%' }}>
              <ExportButton schedule={schedule} eventID={eventID} eventTitle={eventTitle} eventDescription={eventDescription} />
              <EventAddToGroup eventID={eventID} groupsAlreadyIn={groups} setTagList={setTagList} setGroups={setGroups} />
              <EventCopyConfirmLink eventName={eventTitle} schedule={schedule} copyLink={copyLink} />
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
              <CalendarForFinal schedule={schedule} startTime={startTime} endTime={endTime} startDate={startDate} numOfDays={numOfDays} memberList={memberList} selectedList={selectedList} enablePriority={enablePriority} />
            </div>
          </div>
        )}
      </>
    ) : (
      <>
        {homeCardLoading && <Spin />}
        <HomeCard loading={homeCardLoading} setLoading={setHomeCardLoading} atHome={false} />
      </>
    )
  );
}
