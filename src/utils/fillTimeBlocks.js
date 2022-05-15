import instance from '../instance';

export default async (eventId, enablePriority, normal, priority) => {
  if (enablePriority) {
    try {
      const res = await instance.post('/v1/timeblocks/', {
        eventId,
        normal: normal.map((ele) => ele.toISOString()),
        priority: priority.map((ele) => ele.toISOString()),
      });
      console.log(res);
      return {
        status: 'success',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
      };
    }
  } else {
    try {
      const res = await instance.post('/v1/timeblocks/', {
        eventId,
        normal: normal.map((ele) => ele.toISOString()),
      });
      console.log(res);
      return {
        status: 'success',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
      };
    }
  }
};
