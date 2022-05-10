import axios from 'axios';

export default async (form) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  if (!form.userName) delete form.userName;
  try {
    const res = await axios.post(`${baseURL}/v1/users/`, form);
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
