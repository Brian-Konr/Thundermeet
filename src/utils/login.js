import axios from 'axios';

export default async (form) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${baseURL}/v1/users/login`, form);
    const { token } = res.data;
    localStorage.setItem('token', token);
    return res.statusText;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
