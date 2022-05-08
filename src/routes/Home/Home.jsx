import { useState } from 'react';

import HomeCard from '../../components/HomeCard/HomeCard';
import logo from '../../icons/logo.png';

import './Home.css';

export default function Home() {
  const [option, setOption] = useState('login');
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F3F4', minHeight: '100vh',
    }}
    >
      <img className="home-logo" src={logo} alt="logo" />
      <h2 style={{ marginTop: '-2.2vh' }}>Thundermeet, Faster Meet!</h2>
      {!localStorage.getItem('token')
        && (
        <HomeCard
          option={option}
          setOption={setOption}
        />
        )}
    </div>
  );
}
