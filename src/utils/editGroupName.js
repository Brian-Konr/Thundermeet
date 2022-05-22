import instance from '../instance';

export default async (groupID, newGroupName) => {
  try {
    await instance.patch(`/v1/groups/${groupID}`, {
      group_name: newGroupName,
    });
    return 'success';
  } catch (error) {
    return 'error';
  }
};
