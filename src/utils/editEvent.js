import instance from '../instance';

// TODO: 要接 event_description
export default async (eventID, eventName /* eventDescription */) => {
  try {
    await instance.patch('/v1/events/', {
      event_id: eventID,
      event_name: eventName,
      // event_description: eventDescription || '',
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return 'fail';
  }
};
