import { message } from 'antd';

import instance from '../instance';

export default async (revisedName) => {
  try {
    // const res = await instance.patch('/v1/users/', {
    //   headers: {
    //     accept: 'application/json',
    //   },
    // });
    const res = await instance.patch('/v1/users/', {
      userName: revisedName,
      // passwordAnswer: 'NTU',
    });
    if (res.status === 200) message.success(res.data.msg, 2);
  } catch (error) {
    console.log(error);
    // return {
    //   status: 'error',
    //   data: error,
    // };
  }
};
