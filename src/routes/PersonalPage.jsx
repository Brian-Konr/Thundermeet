import { useEffect, useState } from 'react';

import Avatar from '../components/Avatar/Avatar';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import MyGroups from '../components/MyGroups/MyGroups';
import Navbar from '../components/Navbar/Navbar';
import getInfo from '../utils/getInfo';

export default function PersonalPage() {
  const [passwordAnswer, setPasswordAnswer] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    (async () => {
      const res = await getInfo();
      if (res.status === 'success') {
        console.log(res.data);
        setPasswordAnswer(res.data.password_answer);
        setUserID(res.data.user_id);
        setUserName(res.data.username);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex', flexDirection: 'column', paddingBottom: '16px', margin: '38px',
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
  );
}
