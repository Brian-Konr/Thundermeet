import { useState } from 'react';

import EditEvent from '../components/EditEvent/EditEvent';
import Navbar from '../components/Navbar/Navbar';

export default function EditEventPage() {
  const [eventName, setEventName] = useState('SAD Meeting');
  const [eventDescription, setEventDescription] = useState('hi');
  const [eventTimeRange, setEventTimeRange] = useState(['09:00', '18:00']);

  return (
    <div>
      <Navbar />
      <div style={{ background: '#F8F8F8', height: '92vh' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', margin: '38px', padding: '60px',
        }}
        >
          <EditEvent
            eventName={eventName}
            setEventName={setEventName}
            eventDescription={eventDescription}
            setEventDescription={setEventDescription}
            eventTimeRange={eventTimeRange}
            setEventTimeRange={setEventTimeRange}
          />
        </div>
      </div>
    </div>
  );
}
