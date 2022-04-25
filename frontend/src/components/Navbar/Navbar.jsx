import logo from '../../icons/logo.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Space } from 'antd';
import { PlusOutlined, UserOutlined, ProfileFilled, UserSwitchOutlined } from '@ant-design/icons';
export default function Navbar() {

	const navigate = useNavigate();

	const items = [
		{
			label: 'My Profile',
			key: 'profile',
			icon: <ProfileFilled />
		},
		{
			label: 'Log Out',
			key: 'logout',
			icon: <UserSwitchOutlined />
		}
	]

	const userOnclick = (e) => {
		if (e.key === 'profile') navigate('/personal');
		else if (e.key === 'logout') {
			// clear jwt token and back to home screen
			navigate('/');
		} 
	}


	return (
		<>
			<nav className='nav-bar'>
				<div>
					<Link to='/'>
						<img className='logo' src={logo} />
					</Link>
					<Button className='add-event-button' type='primary' size='large' shape='round' icon={<PlusOutlined />}>Add Event!</Button>
				</div>
				<Dropdown overlay={<Menu onClick={userOnclick} items={items} />} arrow>
					<div className='user-icon'>
						<UserOutlined style={{fontSize: '200%', color: 'white'}}/>
					</div>
				</Dropdown>
			</nav>
		</>
	)
}