import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import CreateButton from '../../components/CreateButton/CreateButton';
import CreateSelectTime from '../../components/CreateSelectTime/CreateSelectTime';
import CreateTitleDescription from '../../components/CreateTitleDescription/CreateTitleDescription';
import Navbar from '../../components/Navbar/Navbar';

export default function AddEventPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescirption] = useState('');
  const [eventPriority, setEventPriority] = useState(false);
  const [eventDateRange, setEventDateRange] = useState([]);

  // store startTime and endTime
  const [startTime, setStartTime] = useState('10');
  const [endTime, setEndTime] = useState('22');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      message.error('Please login first!');
      navigate('/');
    }
  }, []);

  return (
    localStorage.getItem('token') && (
    <div>
      <Navbar />
      <div style={{ background: '#F8F8F8', height: '92vh' }}>
        <div>
          <h1 style={{
            fontSize: '48px', fontWeight: 'bold', textAlign: 'center', paddingTop: '40px',
          }}
          >
            CREATE A MEETING
          </h1>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'row', margin: '38px', justifyContent: 'space-evenly',
        }}
        >
          <CreateTitleDescription
            setEventName={setEventName}
            setEventDescription={setEventDescirption}
          />
          <CreateSelectTime
            eventPriority={eventPriority}
            setEventPriority={setEventPriority}
            eventDateRange={eventDateRange}
            setEventDateRange={setEventDateRange}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        </div>
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <CreateButton
            eventName={eventName}
            eventDescription={eventDescription}
            eventPriority={eventPriority}
            eventDateRange={eventDateRange}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
      </div>
    </div>
    )
  );
}
