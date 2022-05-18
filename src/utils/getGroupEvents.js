import instance from '../instance';

export default async (groupID) => {
  if (groupID === 'participated') {
    const res = await instance.get('/v1/events/');
    return {
      events: res.data,
      groupName: '已參與',
      isDefault: true,
    };
  } if (groupID === 'created') {
    const res = await instance.get('/v1/events/');
    return {
      events: res.data.filter((event) => event.admin_id === localStorage.getItem('userID')),
      groupName: '已發起',
      isDefault: true,
    };
  } if (groupID === 'confirmed') {
    const res = await instance.get('/v1/events/');
    return {
      events: res.data.filter((event) => event.is_confirmed),
      groupName: '已確認',
      isDefault: true,
    };
  }

  const res = await instance.get(`/v1/groups/${groupID}`);
  return {
    events: res.data.event_ids ? res.data.event_ids : [],
    groupName: res.data.group_name,
    isDefault: false,
  };
};
