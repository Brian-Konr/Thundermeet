import instance from '../instance';

export default async (eventIDs, groupID) => {
  if (eventIDs.length === 0) {
    return {
      status: 'success',
    };
  }
  try {
    const res = await instance.delete(`/v1/groups/${groupID}`, {
      data: {
        event_ids: eventIDs,
      },
    });
    return {
      status: 'success',
      msg: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      error,
    };
  }
};
