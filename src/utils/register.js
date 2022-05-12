import axios from 'axios';

export default async (form) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  if (!form.userName) delete form.userName;
  try {
    await axios.post(`${baseURL}/v1/users/`, form);
    return {
      status: 'success',
    };
  } catch (error) {
    console.log(error);
    return {
      status: 'fail',
      msg: error.response.data.msg,
    };
  }
};
