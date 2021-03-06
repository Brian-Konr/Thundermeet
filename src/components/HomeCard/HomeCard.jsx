import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InfoCircleOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined,
} from '@ant-design/icons';
import {
  Button, Card, Form, Input, message, Spin, Tooltip,
} from 'antd';

import checkPasswordAnswer from '../../utils/checkPasswordAnswer';
import login from '../../utils/login';
import register from '../../utils/register';
import resetPassword from '../../utils/resetPassword';

import './HomeCard.css';

export default function HomeCard({
  loading, setLoading, atHome,
}) {
  const [tempToken, setTempToken] = useState('');
  const [resetUserID, setResetUserID] = useState('');
  const [option, setOption] = useState('login');
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    if (option === 'login') {
      const res = await login(values);
      setLoading(false);
      if (res === 'error') message.error('Login failed..., User ID or Password does not exist', 2);
      else {
        message.success('Welcome to Thundermeet!', 2);
        if (atHome) navigate('/personal');
        else window.location.reload();
        // success and direct to personal page
      }
    } else if (option === 'register') {
      const res = await register(values);
      setLoading(false);
      console.log(res);
      if (res.status === 'fail') message.error(res.msg, 2);
      else {
        // success and turn to login page
        message.success('Successfully registered!', 2);
        setOption('login');
      }
    } else if (option === 'forget') {
      // handle forget password
      const { status, token } = await checkPasswordAnswer(values);
      setLoading(false);
      if (status === 'error') {
        message.error('User ID or answer is wrong...', 1.5);
        return;
      }
      message.success('You can reset your new password now!', 1.5);
      setResetUserID(values.userId);
      setTempToken(token);
      setOption('reset');
    } else if (option === 'reset') {
      const status = await resetPassword(tempToken, resetUserID, values.password);
      setLoading(false);
      if (status === 'error') {
        message.error('Password reset failed...', 1.5);
        return;
      }
      message.success('Password reset successfully!', 1.5);
      setOption('login');
    }
  };

  return (
    <div style={{ marginBottom: '2vh' }}>
      {loading ? <Spin className="spin" style={{ marginLeft: '0vw', marginTop: '30vh', backgroundColor: 'transparent' }} /> : (
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
                  case 'reset': return 'Reset Password';
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
            {option !== 'reset' && (
              <>
                <div style={{ fontSize: '20px' }}>
                  User ID
                  {' '}
                  {/* <Tooltip title="For login, cannot change once set">
                    <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                  </Tooltip> */}
                </div>
                <Form.Item
                  name="userId"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your User ID!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    // prefix={(
                    //   <Tooltip title="For login, cannot change once set">
                    //     <UserOutlined className="site-form-item-icon" />
                    //   </Tooltip>
                    // )}
                    placeholder="User ID"
                  />
                </Form.Item>
              </>
            )}

            {option === 'forget' && (
              <>
                <div style={{ fontSize: '20px' }}>
                  Password Recovery Answer
                  {' '}
                  <Tooltip title="What&apos;s the name of your college or senior high?">
                    <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                  </Tooltip>
                </div>
                <Form.Item
                  name="passwordAnswer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your answer!',
                    },
                  ]}
                  // style={{ marginTop: '-1.2vw' }}
                >
                  <Input
                    prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
                    // prefix={(
                    //   <Tooltip title="For password recovery usage">
                    //     <QuestionCircleOutlined className="site-form-item-icon" />
                    //   </Tooltip>
                    // )}
                    placeholder="Answer"
                  />
                </Form.Item>
              </>
            )}

            {option === 'register' && (
              <>
                <div style={{ fontSize: '20px' }}>
                  Nickname
                  {' '}
                  <Tooltip title="Display name, can be changed">
                    <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                  </Tooltip>
                </div>
                <Form.Item
                  name="userName"
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    // prefix={(
                    //   <Tooltip title="Display name, can be changed">
                    //     <UserOutlined className="site-form-item-icon" />
                    //   </Tooltip>
                    // )}
                    placeholder="Nickname"
                  />
                </Form.Item>
              </>
            )}

            {option !== 'forget' && (
              <>
                <p style={{ fontSize: '20px' }}>{option === 'reset' ? 'New Password' : 'Password'}</p>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                  style={{ marginTop: '-1.2vw' }}
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
                <div style={{ fontSize: '20px' }}>
                  What&apos;s the name of your college or senior high?
                  {' '}
                  <Tooltip title="For password recovery usage">
                    <InfoCircleOutlined style={{ fontSize: '16px', marginLeft: '8px' }} />
                  </Tooltip>
                </div>
                <p style={{ fontSize: '13px' }}>(in abbreviation)</p>
                <Form.Item
                  name="passwordAnswer"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your answer!',
                    },
                  ]}
                >
                  <Input
                    prefix={<QuestionCircleOutlined className="site-form-item-icon" />}
                    // prefix={(
                    //   <Tooltip title="For password recovery usage">
                    //     <QuestionCircleOutlined className="site-form-item-icon" />
                    //   </Tooltip>
                    // )}
                    placeholder="Answer"
                    // suffix={(
                    //   <Tooltip title="For password recovery usage">
                    //     <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    //   </Tooltip>
                    // )}
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
                    case 'reset': return 'Reset';
                    default: return 'Login';
                  }
                })()}
              </Button>
            </Form.Item>
          </Form>
          <div style={{
            textAlign: 'center', marginTop: '-1vh', display: 'flex', flexDirection: 'row',
          }}
          >
            {option === 'login' ? (
              <p style={{ marginTop: '0.5vh', fontSize: '15px' }}>Don???t have an account?</p>
            ) : (
              <p style={{ marginTop: '0.5vh', fontSize: '15px', marginLeft: '1vw' }}>Already have an account?</p>
            )}
            <Button
              disabled={loading}
              style={{
                borderColor: 'white', boxShadow: 'none', color: '#01A494', fontSize: '15px',
              }}
              type="secondary"
              onClick={() => setOption((prev) => (prev === 'login' ? 'register' : 'login'))}
            >
              {option === 'login' ? 'Sign up' : 'Login'}
            </Button>
          </div>
          {option === 'login' && (
            <div
              className="forget-button"
              style={{
                textAlign: 'center', fontSize: '15px', marginTop: '-1vh', display: 'flex', flexDirection: 'row',
              }}
            >
              <p style={{ marginTop: '-0.4vh' }}>Forgot your password?</p>
              <Button
                style={{
                  background: 'none', borderColor: 'white', boxShadow: 'none', color: '#01A494', marginTop: '-1vh', fontSize: '15px',
                }}
                onClick={() => setOption('forget')}
              >
                Click to get it now
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
