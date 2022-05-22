import axios from 'axios';

export default async (form) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${baseURL}/v1/users/checkAnswer`, form);
    const { token } = res.data;
    return {
      status: 'success',
      token,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'error',
      data: error,
    };
  }
};
