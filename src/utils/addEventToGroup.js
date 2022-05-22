import instance from '../instance';

export default async (eventID, groupID) => {
  try {
    const res = await instance.post(`/v1/groups/${groupID}`, {
      event_ids: [Number(eventID)],
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
