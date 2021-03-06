import instance from '../instance';

export default async () => {
  try {
    const res = await instance.get('/v1/events/');
    return {
      status: 'success',
      data: res.data,
    };
  } catch (error) {
    return {
      status: 'error',
    };
  }
};
