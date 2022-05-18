import { useNavigate } from 'react-router-dom';
import { LockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Card, Form, Input, message,
} from 'antd';

import login from '../../utils/login';
import register from '../../utils/register';

import './HomeCard.css';

export default function HomeCard({ option, setOption }) {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    if (option === 'login') {
      const res = await login(values);
      if (res === 'error') message.error('login failed..., ID or password does not exist', 2);
      else {
        message.success('Welcome to Thundermeet!', 2);
        navigate('/personal');
        // success and direct to personal page
      }
    } else if (option === 'register') {
      const res = await register(values);
      console.log(res);
      if (res.status === 'fail') message.error(res.msg, 2);
      else {
        // success and turn to login page
        message.success('successfully registered!', 2);
        setOption('login');
      }
    } else if (option === 'forget') {
      // handle forget password
    }
  };

  return (
    <div style={{ marginBottom: '2vh' }}>
      <Card style={{
        marginTop: '2vh', minWidth: '30vw', display: 'flex', justifyContent: 'center', borderRadius: '1.6vw', boxShadow: '2px 2px gray',
      }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px' }}>
            {(() => {
              switch (option) {
                case 'login': return 'Login';
                case 'register': return 'Register';
                case 'forget': return 'Forgot Password';
                default: return 'Login Form';
              }
            })()}

          </h1>
        </div>
        <Form
          name="login"
          className="login-form"
          onFinish={onFinish}
        >
          <p style={{ fontSize: '20px' }}>User ID</p>
          <Form.Item
            name="userId"
            rules={[
              {
                required: true,
                message: 'Please input your user id!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User ID" />
          </Form.Item>

          {option === 'register' && (
            <>
              <p style={{ fontSize: '20px' }}>User Name</p>
              <Form.Item
                name="userName"
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="User Name"
                />
              </Form.Item>
            </>
          )}

          {option !== 'forget' && (
            <>
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
            </>
          )}

          {option === 'register' && (
            <>
              <p style={{ fontSize: '20px' }}>Name of your College?</p>
              <p style={{ fontSize: '13px', marginTop: '-2vh' }}>(in abbreviation)</p>
              <Form.Item
                name="passwordAnswer"
                rules={[
                  {
                    required: true,
                    message: 'Please input your answer',
                  },
                ]}
              >
                <Input
                  prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
                  placeholder="Answer"
                />
              </Form.Item>
            </>
          )}

          <Form.Item style={{ textAlign: 'center', fontSize: '16px' }}>
            <Button
              style={{
                height: '46px', background: '#01A494', color: '#FFF', fontSize: '20px', borderRadius: '10px',
              }}
              htmlType="submit"
            >
              {(() => {
                switch (option) {
                  case 'login': return 'Login';
                  case 'register': return 'Register';
                  case 'forget': return 'Submit';
                  default: return 'Login';
                }
              })()}
            </Button>
          </Form.Item>
        </Form>

        {option === 'login' && (
          <div className="forget-button" style={{ textAlign: 'center', fontSize: '15px', marginTop: '-1vh' }}><Button style={{ background: 'none', borderColor: 'white', boxShadow: 'none' }} onClick={() => setOption('forget')}>Forgot Password?</Button></div>
        )}
        <div style={{ textAlign: 'center', marginTop: '1vh' }}>
          <Button
            style={{
              borderColor: 'white', boxShadow: 'none', color: '#01A494', fontSize: '15px',
            }}
            type="secondary"
            onClick={() => setOption((prev) => (prev === 'login' ? 'register' : 'login'))}
          >
            {option === 'login' ? 'or register now!' : 'already have an account?'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
