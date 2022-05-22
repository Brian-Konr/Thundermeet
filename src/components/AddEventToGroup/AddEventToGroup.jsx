import { useEffect, useState } from 'react';
import {
  Form, Modal, Select,
} from 'antd';

import getMyEvents from '../../utils/getMyEvents';

import './AddEventToGroup.css';

export default function AddEventToGroup({
  isAddEvent, setIsAddEvent, editOngoingEvents, setEditOngoingEvents, editDecidedEvents,
  setEditDecidedEvents,
}) {
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getMyEvents();
      setAllEvents(res.data.map((eventObj) => ({
        key: eventObj.event_id,
        title: eventObj.event_name,
        isConfirmed: eventObj.is_confirmed,
      })));
    })();
  }, []);

  const { Option } = Select;
  const [form] = Form.useForm();

  const addEvents = (options) => {
    for (let i = 0; i < options.selectEvents.length; i += 1) {
      if (allEvents.find(
        (e) => e.key === options.selectEvents[i],
      ).isConfirmed === false) {
        setEditOngoingEvents((oldArray) => [...oldArray, allEvents.find(
          (e) => e.key === options.selectEvents[i],
        )]);
      } else {
        setEditDecidedEvents((oldArray) => [...oldArray, allEvents.find(
          (e) => e.key === options.selectEvents[i],
        )]);
      }
    }
  };

  if (isAddEvent === true) {
    return (
      <div>
        <Modal
          title="Add Events to Group"
          visible
          okText="Add"
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                setIsAddEvent(false);
                addEvents(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
          onCancel={() => {
            setIsAddEvent(false);
            form.resetFields();
          }}
        >
          <Form
            form={form}
            layout="vertical"
          >
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
                placeholder="Select events to add to the group"
              >
                {allEvents.filter((event) => {
                  if (Object.values(editOngoingEvents)
                    .filter((editObj) => editObj.key === event.key)
                    .length > 0) return false;
                  if (Object.values(editDecidedEvents)
                    .filter((editObj) => editObj.key === event.key)
                    .length > 0) return false;
                  return true;
                }).map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
