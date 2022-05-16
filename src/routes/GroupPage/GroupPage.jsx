import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddEventToGroup from '../../components/AddEventToGroup/AddEventToGroup';
import DeleteGroup from '../../components/DeleteGroup/DeleteGroup';
import EditGroup from '../../components/EditGroup/EditGroup';
import GroupDecided from '../../components/GroupDecided/GroupDecided';
import GroupOngoing from '../../components/GroupOngoing/GroupOngoing';
import GroupTitle from '../../components/GroupTitle/GroupTitle';
import Navbar from '../../components/Navbar/Navbar';
import getGroupEvents from '../../utils/getGroupEvents';

export default function GroupPage() {
  const { groupID } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [groupTitle, setGroupTitle] = useState('SAD');
  const [editTitle, setEditTitle] = useState(groupTitle);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [editOngoingEvents, setEditOngoingEvents] = useState(ongoingEvents);
  const [decidedEvents, setDecidedEvents] = useState([]);
  const [editDecidedEvents, setEditDecidedEvents] = useState(decidedEvents);
  const [allEvents, setAllEvents] = useState([]);
  // const allEvents = [
  //   { title: 'SAD1', key: 1 },
  //   { title: 'SAD2', key: 2 },
  //   { title: 'SAD3', key: 3 },
  //   { title: 'SAD hi', key: 4 },
  //   { title: 'SAD hello', key: 5 },
  //   { title: 'Milestone1', key: 6 },
  //   { title: 'Milestone2', key: 7 },
  //   { title: 'Interview', key: 8 },
  //   { title: 'Bug Discussion', key: 9 },
  //   { title: 'Lunch', key: 10 },
  // ];

  useEffect(() => {
    (async () => {
      const events = await getGroupEvents(groupID);
      console.log(events);
      setAllEvents(events.map((event) => ({
        title: event.event_name,
        key: event.event_id,
        isConfirmed: event.is_confirmed,
      })));
    })();
  }, []);

  useEffect(() => {
    if (allEvents.length > 0) {
      setOngoingEvents(allEvents.filter((event) => !event.isConfirmed));
      setDecidedEvents(allEvents.filter((event) => event.isConfirmed));
    }
  }, [allEvents]);

  return (
    <div>
      <Navbar />
      <div style={{ background: '#F8F8F8', height: '92vh' }}>
        <div style={{
          marginLeft: '38px', marginRight: '38px', marginBottom: '38px', paddingTop: '38px',
        }}
        >
          <div style={{ textAlign: 'right' }}>
            <EditGroup
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              editTitle={editTitle}
              setGroupTitle={setGroupTitle}
              ongoingEvents={ongoingEvents}
              editOngoingEvents={editOngoingEvents}
              setOngoingEvents={setOngoingEvents}
              setEditOngoingEvents={setEditOngoingEvents}
              decidedEvents={decidedEvents}
              editDecidedEvents={editDecidedEvents}
              setDecidedEvents={setDecidedEvents}
              setEditDecidedEvents={setEditDecidedEvents}
            />
          </div>
          <AddEventToGroup
            isAddEvent={isAddEvent}
            setIsAddEvent={setIsAddEvent}
            editOngoingEvents={editOngoingEvents}
            setEditOngoingEvents={setEditOngoingEvents}
            editDecidedEvents={editDecidedEvents}
            setEditDecidedEvents={setEditDecidedEvents}
            allEvents={allEvents}
          />
          <div style={{
            display: 'flex', flexDirection: 'column', paddingBottom: '16px', marginTop: '-10px',
          }}
          >
            <GroupTitle
              isEdit={isEdit}
              groupTitle={groupTitle}
              setEditTitle={setEditTitle}
            />
            <br />
            <GroupOngoing
              isEdit={isEdit}
              ongoingEvents={ongoingEvents}
              editOngoingEvents={editOngoingEvents}
              setEditOngoingEvents={setEditOngoingEvents}
              setIsAddEvent={setIsAddEvent}
            />
            <GroupDecided
              isEdit={isEdit}
              decidedEvents={decidedEvents}
              editDecidedEvents={editDecidedEvents}
              setEditDecidedEvents={setEditDecidedEvents}
            />
            <DeleteGroup
              isEdit={isEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
