import {
  Form, Modal, Select,
} from 'antd';

import './AddEventToGroup.css';

export default function AddEventToGroup({
  isAddEvent, setIsAddEvent, ongoingEvent, setOngoingEvents, allEvents,
}) {
  // const { Option } = Select;
  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setIsAddEvent(false);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  if (isAddEvent === true) {
    // return (
    //   <div>
    //     <Modal
    //       title="Add Events to Group"
    //       visible
    //       okText="Add"
    //       onOk={() => {
    //         setOngoingEvents((oldArray) => [...oldArray, form.getFieldValue('events')]);
    //         form
    //           .validateFields()
    //           .then((values) => {
    //             form.resetFields();
    //             onCreate(values);
    //           })
    //           .catch((info) => {
    //             console.log('Validate Failed:', info);
    //           });
    //       }}
    //       onCancel={() => {
    //         setIsAddEvent(false);
    //         form.resetFields();
    //       }}
    //     >
    //       <Form
    //         form={form}
    //         layout="vertical"
    //       >
    //         <Form.Item label="Select Ongoing Events">
    //           <Select
    //             name="events"
    //             mode="multiple"
    //             style={{ width: '70%' }}
    //             placeholder="Select events"
    //             onChange={() => { handleChange(); }}
    //             rules={[
    //               {
    //                 required: true,
    //                 message: 'Please select at least one event!',
    //               },
    //             ]}
    //           >
    //             {allEvents}
    //           </Select>
    //         </Form.Item>
    //       </Form>
    //     </Modal>
    //   </div>
    // );
  }
}
