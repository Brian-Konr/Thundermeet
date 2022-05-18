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
  const [groupTitle, setGroupTitle] = useState('');
  const [editTitle, setEditTitle] = useState(groupTitle);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [editOngoingEvents, setEditOngoingEvents] = useState(ongoingEvents);
  const [decidedEvents, setDecidedEvents] = useState([]);
  const [editDecidedEvents, setEditDecidedEvents] = useState(decidedEvents);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { events, groupName, isDefault } = await getGroupEvents(groupID);
      console.log(events);
      setGroupTitle(groupName);
      if (isDefault) {
        setAllEvents(events.map((event) => ({
          title: event.event_name,
          key: event.event_id,
          isConfirmed: event.is_confirmed,
        })));
      } else {
        setAllEvents(events.map((event) => ({
          title: event.Event_name,
          key: event.Event_id,
          isConfirmed: event.Is_confirmed,
        })));
      }
    })();
  }, []);

  useEffect(() => {
    if (allEvents.length > 0) {
      setOngoingEvents(allEvents.filter((event) => !event.isConfirmed));
      setEditOngoingEvents(allEvents.filter((event) => !event.isConfirmed));
      setDecidedEvents(allEvents.filter((event) => event.isConfirmed));
      setEditDecidedEvents(allEvents.filter((event) => event.isConfirmed));
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
