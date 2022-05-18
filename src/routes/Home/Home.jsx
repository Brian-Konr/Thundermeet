import { useState } from 'react';
import { Spin } from 'antd';

import HomeCard from '../../components/HomeCard/HomeCard';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../icons/logo.png';

import './Home.css';

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {localStorage.getItem('token') && <Navbar />}
      {loading && <Spin />}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F3F4', minHeight: '100vh',
      }}
      >
        <img className="home-logo" src={logo} alt="logo" />
        <h2 style={{ marginTop: '-2.2vh' }}>Thundermeet, Faster Meet!</h2>
        {!localStorage.getItem('token')
          && (
          <HomeCard
            loading={loading}
            setLoading={setLoading}
            atHome
          />
          )}
      </div>
    </>
  );
}
