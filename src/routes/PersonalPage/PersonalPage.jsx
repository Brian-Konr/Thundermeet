import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';

import Avatar from '../../components/Avatar/Avatar';
import BasicInfo from '../../components/BasicInfo/BasicInfo';
import MyGroups from '../../components/MyGroups/MyGroups';
import Navbar from '../../components/Navbar/Navbar';
import getInfo from '../../utils/getInfo';
import getMyGroups from '../../utils/getMyGroups';
// import getMyEvents from '../utils/getMyEvents';

export default function PersonalPage() {
  const navigate = useNavigate();
  const [passwordAnswer, setPasswordAnswer] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getInfo();
      const { groups } = await getMyGroups();
      if (res.status === 'success' && groups) {
        setGroupList(groups);
        setLoading(false);
        setPasswordAnswer(res.data.password_answer);
        setUserID(res.data.user_id);
        setUserName(res.data.username);
      } else {
        message.error('Please login first!');
        navigate('/');
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
            <MyGroups groupList={groupList} setGroupList={setGroupList} />
          </div>
        </div>
      )}
    </>
  );
}
