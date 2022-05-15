import { useState } from 'react';

import AddEventToGroup from '../components/AddEventToGroup/AddEventToGroup';
import DeleteGroup from '../components/DeleteGroup/DeleteGroup';
import EditGroup from '../components/EditGroup/EditGroup';
import GroupDecided from '../components/GroupDecided/GroupDecided';
import GroupOngoing from '../components/GroupOngoing/GroupOngoing';
import GroupTitle from '../components/GroupTitle/GroupTitle';
import Navbar from '../components/Navbar/Navbar';

export default function GroupPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [groupTitle, setGroupTitle] = useState('SAD');
  const [ongoingEvents, setOngoingEvents] = useState([<p key="1" className="ongoing">SAD1</p>, <p key="2" className="ongoing">SAD2</p>, <p key="3" className="ongoing">SAD3</p>]);
  const [decidedEvents, setDecidedEvents] = useState([<p key="4" className="decided">Milestone1</p>, <p key="5" className="decided">Milestone2</p>]);
  const allEvents = [[<p key="1" className="ongoing">SAD1</p>, <p key="2" className="ongoing">SAD2</p>, <p key="3" className="ongoing">SAD3</p>,
    <p key="4" className="decided">Milestone1</p>, <p key="5" className="decided">Milestone2</p>,
  ]];

  return (
    <div>
      <Navbar />
      <div style={{ margin: '38px' }}>
        <div style={{ textAlign: 'right' }}>
          <EditGroup
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
        <AddEventToGroup
          isAddEvent={isAddEvent}
          setIsAddEvent={setIsAddEvent}
          ongoingEvents={ongoingEvents}
          setOngoingEvents={setOngoingEvents}
          decidedEvents={decidedEvents}
          setDecidedEvents={setDecidedEvents}
          allEvents={allEvents}
        />
        <div style={{
          display: 'flex', flexDirection: 'column', paddingBottom: '16px', marginTop: '-10px',
        }}
        >
          <GroupTitle
            isEdit={isEdit}
            groupTitle={groupTitle}
            setGroupTitle={setGroupTitle}
          />
          <br />
          <GroupOngoing
            isEdit={isEdit}
            ongoingEvents={ongoingEvents}
            setOngoingEvents={setOngoingEvents}
            setIsAddEvent={setIsAddEvent}
          />
          <GroupDecided
            isEdit={isEdit}
            decidedEvents={decidedEvents}
            setDecidedEvents={setDecidedEvents}
          />
          <DeleteGroup
            isEdit={isEdit}
          />
        </div>
      </div>
    </div>
  );
}
