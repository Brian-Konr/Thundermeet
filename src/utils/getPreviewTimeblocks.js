import instance from '../instance';

export default async (eventID) => {
  try {
    const res = await instance.get(`/v1/timeblocks/${eventID}/preview`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
