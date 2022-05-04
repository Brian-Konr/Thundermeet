import Avatar from '../components/Avatar/Avatar';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import MyGroups from '../components/MyGroups/MyGroups';
import Navbar from '../components/Navbar/Navbar';

export default function PersonalPage() {
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
