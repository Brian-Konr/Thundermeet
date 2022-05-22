import instance from '../instance';

export default async (eventIDs, groupID) => {
  if (eventIDs.length === 0) {
    return {
      status: 'success',
    };
  }
  try {
    const res = await instance.post(`/v1/groups/${groupID}`, {
      event_ids: eventIDs,
    });
    return {
      status: 'success',
      msg: res,
    };
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
};
