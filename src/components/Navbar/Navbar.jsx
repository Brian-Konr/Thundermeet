import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusOutlined, ProfileFilled, UserOutlined, UserSwitchOutlined,
} from '@ant-design/icons';
import {
  Button, Dropdown, Menu,
} from 'antd';

import logo from '../../icons/logo.png';

import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: 'My Profile',
      key: 'profile',
      icon: <ProfileFilled />,
    },
    {
      label: 'Log Out',
      key: 'logout',
      icon: <UserSwitchOutlined />,
    },
  ];

  const userOnclick = (e) => {
    if (e.key === 'profile') navigate('/personal');
    else if (e.key === 'logout') {
      console.log(location);
      // clear jwt token and back to home screen
      localStorage.removeItem('token');
      if (location.pathname === '/') window.location.reload();
      else navigate('/');
    }
  };

  return (
    <nav className="nav-bar">
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <Button onClick={() => navigate('/add-event')} className="add-event-button" type="primary" size="large" shape="round" icon={<PlusOutlined />}>Add Event!</Button>
      </div>
      <Dropdown overlay={<Menu onClick={userOnclick} items={items} />} arrow>
        <div className="user-icon">
          <UserOutlined style={{ fontSize: '200%', color: 'white' }} />
        </div>
      </Dropdown>
    </nav>
  );
}
