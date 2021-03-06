import instance from '../instance';

export default async () => {
  try {
    const res = await instance.get('/v1/groups/');
    return {
      status: 'success',
      groups: res.data.data || [],
    };
  } catch (error) {
    return {
      status: 'error',
    };
  }
};
