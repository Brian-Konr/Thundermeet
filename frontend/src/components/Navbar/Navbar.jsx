import logo from '../../icons/logo.png';
import './Navbar.css';
import { Button } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
export default function Navbar() {
	
	return (
		<>
			<nav className='nav-bar'>
				<div>
					<img className='logo' src={logo} />
					<Button className='add-event-button' type='primary' size='large' shape='round' icon={<PlusOutlined />}>Add Event!</Button>
				</div>
				<UserOutlined className='user-icon' style={{fontSize: '250%'}}/>
			</nav>
		</>
	)
}