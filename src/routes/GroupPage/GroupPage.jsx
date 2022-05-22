import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

import AddEventToGroup from '../../components/AddEventToGroup/AddEventToGroup';
import DeleteGroup from '../../components/DeleteGroup/DeleteGroup';
import EditGroup from '../../components/EditGroup/EditGroup';
import GroupDecided from '../../components/GroupDecided/GroupDecided';
import GroupOngoing from '../../components/GroupOngoing/GroupOngoing';
import GroupTitle from '../../components/GroupTitle/GroupTitle';
import Navbar from '../../components/Navbar/Navbar';
import addEventsToGroup from '../../utils/addEventsToGroup';
import deleteEventsFromGroup from '../../utils/deleteEventsFromGroup';
import editGroupName from '../../utils/editGroupName';
import getGroupEvents from '../../utils/getGroupEvents';

export default function GroupPage() {
  const { groupID } = useParams();
  const [submit, setSubmit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [editOngoingEvents, setEditOngoingEvents] = useState([]);
  const [decidedEvents, setDecidedEvents] = useState([]);
  const [editDecidedEvents, setEditDecidedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const fetchGroupInfo = async () => {
    const { events, groupName, isDefault } = await getGroupEvents(groupID);
    setGroupTitle(groupName);
    setEditTitle(groupName);
    if (isDefault) {
      setMyEvents(events.map((event) => ({
        title: event.event_name,
        key: event.event_id,
        isConfirmed: event.is_confirmed,
      })));
    } else {
      setMyEvents(events.map((event) => ({
        title: event.Event_name,
        key: event.Event_id,
        isConfirmed: event.Is_confirmed,
      })));
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  useEffect(() => {
    if (myEvents.length > 0) {
      setOngoingEvents(myEvents.filter((event) => !event.isConfirmed));
      setEditOngoingEvents(myEvents.filter((event) => !event.isConfirmed));
      setDecidedEvents(myEvents.filter((event) => event.isConfirmed));
      setEditDecidedEvents(myEvents.filter((event) => event.isConfirmed));
    }
  }, [myEvents]);

  useEffect(() => {
    if (submit) {
      const eventIDAfterEdit = ongoingEvents.concat(decidedEvents).map((eventObj) => eventObj.key);
      console.log('myEvents: ', myEvents.map((event) => event.key));
      console.log('eventAfterEdit: ', eventIDAfterEdit);
      const toDelete = myEvents
        .filter((event) => !eventIDAfterEdit.includes(event.key))
        .map((event) => event.key);
      console.log('toDelete: ', toDelete);
      const toAdd = eventIDAfterEdit
        .filter((id) => !myEvents.map((e) => e.key).includes(id));
      console.log('toAdd: ', toAdd);
      (async () => {
        const editGroupNameRes = await editGroupName(groupID, groupTitle);
        const addRes = await addEventsToGroup(toAdd, groupID);
        const deleteRes = await deleteEventsFromGroup(toDelete, groupID);
        console.log(addRes, deleteRes);
        if (addRes.status === 'success' && deleteRes.status === 'success' && editGroupNameRes === 'success') {
          message.success('Update Successfully!', 1.5);
          fetchGroupInfo();
        } else message.error('Update failed...', 1.5);
      })();
      // console.log(ongoingEvents.concat(decidedEvents));
      // console.log(groupTitle, ongoingEvents, decidedEvents);
      // filter 哪些要刪，哪些要加
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div>
      <Navbar />
      <div style={{ background: '#F8F8F8', minHeight: '92vh' }}>
        <div style={{
          marginLeft: '38px', marginRight: '38px', marginBottom: '38px', paddingTop: '38px',
        }}
        >
          {(groupID !== 'participated' && groupID !== 'created') && (
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
                setSubmit={setSubmit}
              />
            </div>
          )}
          <AddEventToGroup
            isAddEvent={isAddEvent}
            setIsAddEvent={setIsAddEvent}
            editOngoingEvents={editOngoingEvents}
            setEditOngoingEvents={setEditOngoingEvents}
            editDecidedEvents={editDecidedEvents}
            setEditDecidedEvents={setEditDecidedEvents}
            myEvents={myEvents}
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
              groupID={groupID}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
