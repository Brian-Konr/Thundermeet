import axios from 'axios';

export default async (token, userId, password) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    await axios.patch(`${baseURL}/v1/users/resetPassword`, {
      password,
      userId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
