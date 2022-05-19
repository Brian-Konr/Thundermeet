import { format } from 'date-fns';

import instance from '../instance';

// eslint-disable-next-line max-len
export default async (eventId, enablePriority, normal, priority, startDate, startTime, endDate, endTime) => {
  const startTimeStr = startTime < 10 ? `0${startTime}` : `${startTime}`;
  const endTimeStr = endTime < 10 ? `0${endTime}` : `${endTime}`;
  const min = new Date(`${startDate.slice(0, 10)}T${startTimeStr}:00`);
  const max = new Date(`${endDate.slice(0, 10)}T${endTimeStr}:01`);
  if (enablePriority) {
    try {
      const res = await instance.post('/v1/timeblocks/', {
        eventId,
        normal: normal.filter((timeblock) => timeblock >= min && timeblock <= max && timeblock.getHours() >= startTime && timeblock.getHours() < endTime).map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
        priority: priority.filter((timeblock) => timeblock >= min && timeblock <= max && timeblock.getHours() >= startTime && timeblock.getHours() < endTime).map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
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
        normal: normal.filter((timeblock) => timeblock >= min && timeblock <= max && timeblock.getHours() >= startTime && timeblock.getHours() < endTime).map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
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
