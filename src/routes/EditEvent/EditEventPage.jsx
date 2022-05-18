import { useState } from 'react';

import EditEvent from '../../components/EditEvent/EditEvent';
import Navbar from '../../components/Navbar/Navbar';

export default function EditEventPage() {
  const [eventName, setEventName] = useState('SAD Meeting');
  const [eventDescription, setEventDescription] = useState('hi');

  return (
    <div>
      <Navbar />
      <div style={{ background: '#F8F8F8', minHeight: '92vh' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', marginLeft: '38px', marginRight: '38px', marginBottom: '38px', padding: '60px',
        }}
        >
          <EditEvent
            eventName={eventName}
            setEventName={setEventName}
            eventDescription={eventDescription}
            setEventDescription={setEventDescription}
          />
        </div>
      </div>
    </div>
  );
}
