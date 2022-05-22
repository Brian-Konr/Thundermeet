import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';

import EditEvent from '../../components/EditEvent/EditEvent';
import Navbar from '../../components/Navbar/Navbar';
import getEvent from '../../utils/getEvent';

export default function EditEventPage() {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [editLoading, setEditLoading] = useState(false);
  const [eventName, setEventName] = useState('SAD Meeting');
  const [eventDescription, setEventDescription] = useState('hi');

  useEffect(() => {
    (async () => {
      const { status, data } = await getEvent(eventID);
      if (status === 'error') {
        message.error('Cannot find this event!', 1.5);
        navigate('/personal');
        return;
      }
      setLoading(false);
      setEventName(data.event_name);
      setEventDescription(data.event_description);
      if (data.admin_id !== localStorage.getItem('userID')) {
        message.error('You are not the creator of the event!', 2);
        navigate(`/event-time/${eventID}`);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? <Spin className="spin" style={{ marginLeft: '50vw', marginTop: '40vh', backgroundColor: 'white' }} /> : (
        <div style={{ background: '#F8F8F8', minHeight: '92vh' }}>
          <div style={{
            display: 'flex', flexDirection: 'row', marginLeft: '38px', marginRight: '38px', marginBottom: '38px', padding: '60px',
          }}
          >
            <EditEvent
              setEditLoading={setEditLoading}
              eventName={eventName}
              setEventName={setEventName}
              eventDescription={eventDescription}
              setEventDescription={setEventDescription}
              eventID={eventID}
            />
          </div>
        </div>
      )}
    </div>
  );
}
