import { useEffect } from 'react';

import Avatar from '../components/Avatar/Avatar';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import MyGroups from '../components/MyGroups/MyGroups';
import Navbar from '../components/Navbar/Navbar';
import getInfo from '../utils/getInfo';

export default function PersonalPage() {
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex', flexDirection: 'column', paddingBottom: '16px', margin: '38px',
      }}
      >
        <Avatar />
        <BasicInfo />
        <MyGroups />
      </div>
    </div>
  );
}
