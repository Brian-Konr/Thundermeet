import instance from '../instance';

export default async () => {
  try {
    const res = await instance.get('/v1/users/', {
      headers: {
        accept: 'application/json',
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// import axios from 'axios';

// export default async () => {
//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const token = localStorage.getItem('token');
//   try {
//     const res = await axios.get(`${baseURL}/v1/users/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
