import instance from '../instance';

export default async (eventID) => {
  try {
    const res = await instance.get(`/v1/timeblocks/${eventID}/preview`);
    console.log(res.data.normal);
    const normal = res.data.normal ? res.data.normal : [];
    const priority = res.data.priority ? res.data.priority : [];
    const concat = normal.concat(priority);
    return {
      status: 'success',
      normal,
      priority,
      concat,
    };
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
};
