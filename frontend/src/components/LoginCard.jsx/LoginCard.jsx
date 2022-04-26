import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Card, Form, Input,
} from 'antd';

import './LoginCard.css';

export default function LoginCard() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Card style={{
      marginTop: '2vh', width: '30vw', minHeight: '40vh', display: 'flex', justifyContent: 'center', borderRadius: '1.6vw', boxShadow: '2px 2px gray',
    }}
    >
      <Form
        name="login"
        className="login-form"
        onFinish={onFinish}
      >
        <p style={{ fontSize: '20px' }}>User ID</p>
        <Form.Item
          name="user_id"
          rules={[
            {
              required: true,
              message: 'Please input your user id!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User ID" />
        </Form.Item>

        <p style={{ fontSize: '20px' }}>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', fontSize: '16px' }}>
          <Button type="primary" shape="round" style={{ height: '46px', width: '50%' }} htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '-1vh' }}><a href="/">Forgot Password?</a></div>
      <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '1vh' }}>
        Or
        {' '}
        <a href="/">register now!</a>
      </div>
    </Card>
  );
}
