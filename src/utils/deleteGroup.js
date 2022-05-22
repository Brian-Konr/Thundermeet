import instance from '../instance';

export default async (groupID) => {
  try {
    await instance.delete('/v1/groups/', {
      data: {
        group_id: Number(groupID),
      },
    });
    return 'success';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
