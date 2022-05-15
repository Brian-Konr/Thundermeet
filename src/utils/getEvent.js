import instance from '../instance';

export default async (eventID) => {
  try {
    const res = await instance.get(`/v1/events/${eventID}`);
    return {
      status: 'success',
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
    };
  }
};
