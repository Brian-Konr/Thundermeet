import { format } from 'date-fns';

import instance from '../instance';

export default async (eventID, timeblocks) => {
  try {
    await instance.post('/v1/timeblocks/confirm', {
      eventId: Number(eventID),
      timeblocks: timeblocks.map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
