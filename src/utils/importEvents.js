import instance from '../instance';

export default async (eventID, importFrom) => {
  try {
    const res = await instance.patch('/v1/timeblocks/import', {
      dest_event_id: eventID,
      source_event_id: importFrom,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
