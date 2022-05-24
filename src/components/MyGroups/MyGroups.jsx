import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, message, Modal, Select,
} from 'antd';

import createGroup from '../../utils/createGroup';
import getMyEvents from '../../utils/getMyEvents';
import getMyGroups from '../../utils/getMyGroups';

import './MyGroups.css';

export default function MyGroups({ groupList, setGroupList }) {
  const navigate = useNavigate();
  const { Option } = Select;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form] = Form.useForm();

  const fetchGroups = async () => {
    const { groups } = await getMyGroups();
    setGroupList(groups);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getMyEvents();
      setEventList(data.map((event) => (
        <Option
          key={event.event_id}
          value={event.event_id}
        >
          {event.event_name}
        </Option>
      )));
    })();
  }, []);

  const onCreate = ({ groupName }) => {
    if (selected.length === 0) {
      message.error('Please select at least one event!', 2);
      return;
    }
    (async () => {
      const res = await createGroup(selected, groupName);
      if (res.status === 'success') {
        message.success('Group created successfully!', 2);
        setIsFormVisible(false);
      } else {
        message.error(res.error.response.data.msg, 2);
      }
      fetchGroups();
    })();
  };

  if (isFormVisible) {
    return (
      <div>
        <div className="header">
          <h1 className="section-title">My Groups</h1>
          <PlusOutlined role="button" className="add" onClick={() => { setIsFormVisible(true); }} />
          <Modal
            title="Add Group"
            visible={isFormVisible}
            okText="Add"
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  // form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => {
              setIsFormVisible(false);
              form.resetFields();
            }}
          >
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="Group Name"
                name="groupName"
                rules={[
                  {
                    required: true,
                    message: 'Please input group name!',
                  },
                ]}
              >
                <Input placeholder="Enter group name" type="groupName" maxLength="30" />
              </Form.Item>
              <Form.Item
                label="Select Events"
                name="selectEvents"
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one event!',
                  },
                ]}
              >
                <Select
                  type="selectEvents"
                  mode="multiple"
                  style={{ width: '70%' }}
                  placeholder="Select existing events"
                  onChange={(value) => setSelected(value)}
                >
                  {eventList}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <hr />
        <div className="groups">
          <Button className="card default-card" type="primary" onClick={() => navigate('/group/participated')}>Participated</Button>
          <Button className="card default-card" type="primary" onClick={() => navigate('/group/created')}>Created</Button>
          {groupList && groupList.map((group) => <Button className="card custom-card" type="primary" onClick={() => navigate(`/group/${group.group_id}`)}>{group.group_name}</Button>)}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h1 className="section-title">My Groups</h1>
        <PlusOutlined role="button" className="add" onClick={() => { setIsFormVisible(true); }} />
      </div>
      <hr />
      <div className="groups">
        <Button className="card default-card" type="primary" onClick={() => navigate('/group/participated')}>Participated</Button>
        <Button className="card default-card" type="primary" onClick={() => navigate('/group/created')}>Created</Button>
        {groupList && groupList.map((group) => <Button className="card custom-card" type="primary" onClick={() => navigate(`/group/${group.group_id}`)}>{group.group_name}</Button>)}
      </div>
    </div>
  );
}
