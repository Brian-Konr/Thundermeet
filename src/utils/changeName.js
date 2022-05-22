import { message } from 'antd';

import instance from '../instance';

export default async (revisedName) => {
  try {
    const res = await instance.patch('/v1/users/', {
      userName: revisedName,
    });
    if (res.status === 200) message.success(res.data.msg, 2);
  } catch (error) {
    console.log(error);
  }
};
