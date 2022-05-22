import axios from 'axios';

export default async (token, userId, password) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.patch(`${baseURL}/v1/users/resetPassword`, {
      password,
      userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return 'success';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
