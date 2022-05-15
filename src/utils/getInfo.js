import instance from '../instance';

export default async () => {
  try {
    const res = await instance.get('/v1/users/', {
      headers: {
        accept: 'application/json',
      },
    });
    localStorage.setItem('userID', res.data.user_id);
    return {
      status: 'success',
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      data: error,
    };
  }
};
