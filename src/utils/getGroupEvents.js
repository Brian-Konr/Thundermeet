import instance from '../instance';

export default async (groupID) => {
  if (groupID === 'participated') {
    const res = await instance.get('/v1/events/');
    return res.data;
  } if (groupID === 'created') {
    const res = await instance.get('/v1/events/');
    return res.data.filter((event) => event.admin_id === localStorage.getItem('userID'));
  } if (groupID === 'confirmed') {
    const res = await instance.get('/v1/events/');
    return res.data.filter((event) => event.is_confirmed);
  }

  const res = await instance.get(`/v1/groups/${groupID}`);
  return res.data;
};
