import instance from '../instance';

export default async (eventID) => {
  try {
    await instance.delete(`/v1/events/${eventID}`);
    return 'success';
  } catch (error) {
    return 'error';
  }
};
