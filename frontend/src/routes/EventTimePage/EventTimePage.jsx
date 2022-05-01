/* eslint-disable import/no-extraneous-dependencies */
import {
  CopyOutlined, DownloadOutlined, PlusOutlined,
} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button, Tag,
} from 'antd';

import Calendar from '../../components/Calendar/Calendar';
import CalendarForDisplay from '../../components/CalendarForDisplay/CalendarForDisplay';
import Navbar from '../../components/Navbar/Navbar';

import './EventTimePage.css';

export default function EventTimePage() {
  const eventTitle = '專題會議';
  const tagList = ['SAD', 'milestone2'];
  const eventDescription = '請大家算好交通時間';

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
        <div className="container">
          <Calendar />
          <CalendarForDisplay />
        </div>
      </div>
    </>
  );
}
