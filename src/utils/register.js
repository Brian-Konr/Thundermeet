import instance from '../instance';

export default async (form) => {
  if (!form.userName) delete form.userName;
  try {
    const res = await instance.post('/v1/users', form);
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
