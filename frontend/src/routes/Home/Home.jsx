import LoginCard from '../../components/LoginCard/LoginCard';
import logo from '../../icons/logo.png';

import './Home.css';

export default function Home() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', 'align-items': 'center', backgroundColor: '#F2F3F4', height: '100vh',
    }}
    >
      <img className="home-logo" src={logo} alt="logo" />
      <h2 style={{ marginTop: '-2.2vh' }}>Thundermeet, Faster Meet!</h2>
      <LoginCard />
    </div>
  );
}
