import { format } from 'date-fns';

import instance from '../instance';

export default async (source, dest, timeblocks, eventInfo) => {
  const min = new Date(`${eventInfo.startDate.slice(0, 10)}T${eventInfo.startTime}:00`);
  const max = new Date(`${eventInfo.endDate.slice(0, 10)}T${eventInfo.endTime}:01`);
  try {
    await instance.patch('/v1/timeblocks/export', {
      confirmed_time_blocks: timeblocks.filter((timeblock) => timeblock >= min && timeblock <= max && timeblock.getHours() >= eventInfo.startTime && timeblock.getHours() < eventInfo.endTime).map((ele) => `${format(ele, "yyyy-MM-dd'T'HH:mm:ss")}+08:00`),
      dest_event_id: dest,
      source_event_id: Number(source),
    });
  } catch (error) {
    console.log(error);
  }
};
