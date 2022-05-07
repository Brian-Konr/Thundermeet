import instance from '../instance';

export default async (form) => {
  try {
    const res = await instance.post('/v1/users/login', form);
    return {
      status: 'success',
      data: res,
    };
  } catch (error) {
    return {
      status: 'fail',
      data: error,
    };
  }
};
