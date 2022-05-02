/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined, DownloadOutlined, PlusOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Tag,
} from 'antd';

import CalendarForConfirm from '../../components/CalendarForConfirm/CalendarForConfirm';
import Navbar from '../../components/Navbar/Navbar';

import './ConfirmTimePage.css';

export default function ConfirmTimePage() {
  const eventTitle = '專題會議';
  const tagList = ['SAD', 'milestone2'];
  const eventDescription = '請大家算好交通時間';

  // output
  const [schedule, setSchedule] = useState([]);

  const navigate = useNavigate();
  const cancelAction = () => {
    navigate('/event_time');
  };

  const confirmAction = () => {
    navigate('/event_time');
  };

  return (
    <>
      <Navbar />
      <div style={{ height: '92vh', background: '#F8F8F8' }}>
        <span style={{ marginLeft: '55%' }}>
          <Button className="button-round" icon={<DownloadOutlined />}>Import Calendar</Button>
          <Button className="button-round" icon={<PlusOutlined />}>Add to Category</Button>
          <Button className="button-round" icon={<CopyOutlined />}>Copy Link</Button>
        </span>
        <div style={{ width: '92%', marginLeft: '4%' }}>
          <span>
            <h1 style={{ fontWeight: 'bold', display: 'inline-block' }}>{eventTitle}</h1>
            <Icon icon="akar-icons:edit" width="25px" style={{ marginLeft: '85%' }} />
          </span>
          <div style={{
            background: '#B8B8B8', width: '100%', height: '1px', marginTop: '-14px', marginBottom: '5px',
          }}
          />
          <span>
            {tagList.map((tag) => (
              <Tag color="green">{tag}</Tag>
            ))}
          </span>
          <h3 style={{ marginTop: '5px' }}>{eventDescription}</h3>
        </div>
        <div className="container-confirm">
          <CalendarForConfirm schedule={schedule} setSchedule={setSchedule} />
          <Button
            style={{
              marginTop: '510px', marginLeft: '210px',
            }}
            onClick={cancelAction}
          >
            Cancel
          </Button>
          {schedule.length >= 1 ? (
            <Button
              style={{
                marginTop: '510px', marginLeft: '15px', background: '#01A494', color: 'white',
              }}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
