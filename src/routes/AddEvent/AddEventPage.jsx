import { useState } from 'react';

import CreateButton from '../../components/CreateButton/CreateButton';
import CreateSelectTime from '../../components/CreateSelectTime/CreateSelectTime';
import CreateTitleDescription from '../../components/CreateTitleDescription/CreateTitleDescription';
import Navbar from '../../components/Navbar/Navbar';

export default function AddEventPage() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescirption] = useState('');
  const [eventTypeIsSpecificDays, setEventTypeIsSpecificDays] = useState(true);
  const [eventPriority, setEventPriority] = useState(false);
  const [eventTimeRange, setEventTimeRange] = useState([]);
  const [eventDateRange, setEventDateRange] = useState([]);

  return (
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
            setEventDescirption={setEventDescirption}
          />
          <CreateSelectTime
            eventTypeIsSpecificDays={eventTypeIsSpecificDays}
            setEventTypeIsSpecificDays={setEventTypeIsSpecificDays}
            eventPriority={eventPriority}
            setEventPriority={setEventPriority}
            eventTimeRange={eventTimeRange}
            setEventTimeRange={setEventTimeRange}
            eventDateRange={eventDateRange}
            setEventDateRange={setEventDateRange}
          />
        </div>
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <CreateButton
            eventName={eventName}
            eventDescription={eventDescription}
            eventPriority={eventPriority}
            eventTypeIsSpecificDays={eventTypeIsSpecificDays}
            eventTimeRange={eventTimeRange}
            eventDateRange={eventDateRange}
          />
        </div>
      </div>
    </div>
  );
}
