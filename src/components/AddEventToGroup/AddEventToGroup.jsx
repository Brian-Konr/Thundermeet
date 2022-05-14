import {
  Form, Modal, Select,
} from 'antd';

import './AddEventToGroup.css';

export default function AddEventToGroup({
  isAddEvent, setIsAddEvent, editOngoingEvents, setEditOngoingEvents, editDecidedEvents,
  setEditDecidedEvents, allEvents,
}) {
  const { Option } = Select;
  const [form] = Form.useForm();
  // 有試著 filter 但沒成功 filter
  const filteredEvents = allEvents.filter((option) => !editOngoingEvents.includes(option.title)
    && !editDecidedEvents.includes(option.title));

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setIsAddEvent(false);
  };

  const handleChange = (e) => {
    console.log(`selected ${e.title}`);
  };

  const addEvents = (options) => {
    console.log(options.selectEvents);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < options.selectEvents.length; i++) {
      console.log(options.selectEvents[i]);
      if (!editOngoingEvents.includes(options.selectEvents[i])
      && allEvents.find(
        (e) => e.title === options.selectEvents[i],
      ).key <= 5) {
        setEditOngoingEvents((oldArray) => [...oldArray, allEvents.find(
          (e) => e.title === options.selectEvents[i],
        )]);
      } else if (!editDecidedEvents.includes(options.selectEvents[i])) {
        setEditDecidedEvents((oldArray) => [...oldArray, allEvents.find(
          (e) => e.title === options.selectEvents[i],
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
                onCreate(values);
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
                onChange={(e) => { handleChange(e); }}
              >
                {filteredEvents.map((option) => (
                  <Option key={option.key} value={option.title}>
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
