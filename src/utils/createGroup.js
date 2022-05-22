/* eslint-disable camelcase */
import instance from '../instance';

export default async (event_ids, group_name) => {
  try {
    await instance.post('/v1/groups/', {
      event_ids,
      group_name,
    });
    return {
      status: 'success',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      error,
    };
  }
};
