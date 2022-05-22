/* eslint-disable max-len */
import instance from '../instance';

export default async (eventID) => {
  try {
    const ans = {};
    const res = await instance.get(`/v1/timeblocks/${eventID}`);
    let memberList = [];
    if (res.data[0].normal) memberList = memberList.concat(res.data[0].normal.map((userObj) => userObj.UserName));
    if (res.data[0].priority) memberList = memberList.concat(res.data[0].priority.map((userObj) => userObj.UserName));
    if (res.data[0].not_available) memberList = memberList.concat(res.data[0].not_available.map((userObj) => userObj.UserName));

    res.data.forEach((timeblock) => {
      ans[new Date(timeblock.time)] = {
        normal: timeblock.normal ? timeblock.normal.map((userObj) => userObj.UserName) : [],
        priority: timeblock.priority ? timeblock.priority.map((userObj) => userObj.UserName) : [],
        notAvailable: timeblock.not_available ? timeblock.not_available.map((userObj) => userObj.UserName) : [],
      };
    });
    return {
      status: 'success',
      info: ans,
      memberList,
    };
  } catch (error) {
    return {
      status: 'error',
      error,
    };
  }
};
