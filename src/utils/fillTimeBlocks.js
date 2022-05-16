import { format } from 'date-fns';

import instance from '../instance';

export default async (eventId, enablePriority, normal, priority) => {
  if (enablePriority) {
    try {
      const res = await instance.post('/v1/timeblocks/', {
        eventId,
        normal: normal.map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
        priority: priority.map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
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
        normal: normal.map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
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
