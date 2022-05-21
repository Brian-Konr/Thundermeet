/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import {
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button, Form, message, Modal, Select,
} from 'antd';

import addEventToGroup from '../../utils/addEventToGroup';
import getEvent from '../../utils/getEvent';
import getMyGroups from '../../utils/getMyGroups';

import './EventAddToGroup.css';

export default function EventAddToGroup({
  eventID, groupsAlreadyIn, setTagList, setGroups,
}) {
  const { Option } = Select;
  const [myGroups, setMyGroups] = useState([]);
  const [selected, setSelected] = useState(-1);
  // const groupOptionList = [];
  // for (let i = 0; i < groupList.length; i += 1) {
  //   groupOptionList.push(<Option key={i}>{groupList[i]}</Option>);
  // }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const clickButton = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible) {
      // fetch all groups the user have
      (async () => {
        const res = await getMyGroups();
        console.log(res.groups);
        console.log(groupsAlreadyIn);
        setMyGroups(res.groups.filter((groupObj) => !groupsAlreadyIn.includes(groupObj.group_id)));
      })();
    }
  }, [isModalVisible]);

  return (
    <>
      <Button className="button-round" icon={<PlusOutlined />} onClick={clickButton}>
        Add to Group
      </Button>
      <Modal
        title="Add to Group"
        visible={isModalVisible}
        okText="Add"
        onOk={async () => {
          if (selected === -1) {
            message.error('Please select at least one group!', 1.5);
            return;
          }
          console.log(selected);
          const res = await addEventToGroup(eventID, selected);
          if (res.status === 'error') {
            message.error('Fail to add event to group!', 1.5);
            return;
          }

          message.success('Successfully added event to group!', 1.5);
          const { data } = await getEvent(eventID);
          setTagList(data.groups.map((groupObj) => groupObj.GroupName));
          setGroups(data.groups.map((groupObj) => groupObj.GroupId));
          setIsModalVisible(false);
          form.resetFields();
        }}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item label="Select Group" name="selectGroup">
            <Select
              style={{ width: '70%' }}
              placeholder="Select existing group"
              onChange={(e) => setSelected(e)}
            >
              {/* {groupOptionList} */}
              {myGroups.map((groupObj) => (
                <Option
                  key={groupObj.group_id}
                >
                  {groupObj.group_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
