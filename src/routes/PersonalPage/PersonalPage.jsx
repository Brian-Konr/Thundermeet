import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import Avatar from '../../components/Avatar/Avatar';
import BasicInfo from '../../components/BasicInfo/BasicInfo';
import MyGroups from '../../components/MyGroups/MyGroups';
import Navbar from '../../components/Navbar/Navbar';
import getInfo from '../../utils/getInfo';
// import getMyEvents from '../utils/getMyEvents';

export default function PersonalPage() {
  const [passwordAnswer, setPasswordAnswer] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await getInfo();
      if (res.status === 'success') {
        setLoading(false);
        console.log(res.data);
        setPasswordAnswer(res.data.password_answer);
        setUserID(res.data.user_id);
        setUserName(res.data.username);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? <Spin className="spin" style={{ marginLeft: '50vw', marginTop: '40vh', backgroundColor: 'white' }} /> : (
        <div style={{ background: '#F8F8F8', minHeight: '92vh' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', paddingBottom: '16px', marginLeft: '38px', marginRight: '38px', marginBottom: '38px',
          }}
          >
            <Avatar userName={userName} userID={userID} />
            <BasicInfo
              setUserName={setUserName}
              passwordAnswer={passwordAnswer}
              userID={userID}
              userName={userName}
            />
            <MyGroups />
          </div>
        </div>
      )}
    </>
  );
}
