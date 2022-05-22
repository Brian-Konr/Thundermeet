/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable brace-style */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import { format } from 'date-fns';

import './CalendarForFinal.css';

export default function CalendarForFinal({
  schedule, startTime, endTime, startDate, numOfDays, memberList, selectedList, enablePriority,
}) {
  const [removeList, setRemoveList] = useState([]);
  const [style, setStyle] = useState({ display: 'flex' });
  const [styleBlock, setStyleBlock] = useState({ display: 'none' });
  const [chosenDate, setChosenDate] = useState(Object.keys(selectedList)[0]);
  const [switchPriority, setSwitchPriority] = useState(true);
  const [displayPriority, setDisplayPriority] = useState('flex');

  useEffect(() => {
    if (enablePriority) {
      setDisplayPriority('flex');
    } else {
      setDisplayPriority('none');
      setSwitchPriority(false);
    }
  }, []);

  const crossMember = (member) => {
    setRemoveList((oldRemoveList) => oldRemoveList.concat(member));
  };

  const unCrossMember = (member) => {
    setRemoveList(removeList.filter((item) => item !== member));
  };

  const switchChange = (checked) => {
    setSwitchPriority(checked);
  };

  return (
    <div style={{
      width: '580px', height: '520px', marginLeft: '80px', borderTop: '1px solid #F8F8F8', marginTop: '5vh', marginBottom: '5vh',
    }}
    >
      <div
        style={{
          width: '40px', height: '40px', background: '#FEDD02', marginTop: '5vh', marginLeft: '0vw',
        }}
      />
      <p style={{
        marginLeft: '-0.7vw', marginTop: '1vh', width: '60px', textAlign: 'center',
      }}
      >
        Selected Time
      </p>
      <div style={{ display: displayPriority, flexDirection: 'row' }}>
        <Switch
          defaultChecked
          onChange={switchChange}
          style={{
            marginTop: '-200px',
            marginLeft: '90px',
            ...(switchPriority ? { background: '#01A494' } : { background: '#B8B8B8' }),
          }}
        />
        <h4 style={{ marginTop: '-200px', marginLeft: '10px' }}>Consider Preference</h4>
      </div>
      <div style={{
        width: '450px', height: '520px', overflow: 'auto', marginTop: '-20vh', marginLeft: '4vw',
      }}
      >
        <ScheduleSelector
          selection={schedule}
          numDays={numOfDays}
          minTime={startTime}
          maxTime={endTime}
          startDate={startDate}
          dateFormat="M/D"
          timeFormat="H:mm"
          columnGap="0px"
          rowGap="0px"
          hourlyChunks={2}
          renderDateLabel={(date) => (
            (numOfDays < 11)
              ? (
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px' }}>{format(date, 'M/d')}</div>
                  <div style={{ fontSize: '10px' }}>{format(date, 'E')}</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                  <div style={{ fontSize: '5px' }}>{format(date, 'd')}</div>
                  <div style={{ fontSize: '5px' }}>{format(date, 'E')}</div>
                </div>
              )
          )}
          renderDateCell={(date, selected, refSetter) => {
            const target = (element) => element.toString() === date.toString();
            return (
              (Object.keys(selectedList).findIndex(target) !== -1)
                ? (
                  <div
                    className="time-block-final"
                    style={schedule.findIndex(target) !== -1 ? { background: '#FEDD02' } : { background: '#FFF' }}
                    onMouseEnter={() => {
                      setStyle({ display: 'none' });
                      setStyleBlock({ display: 'flex' });
                      setChosenDate(date);
                    }}
                    onMouseLeave={() => {
                      setStyle({ display: 'flex' });
                      setStyleBlock({ display: 'none' });
                    }}
                    ref={refSetter}
                  />
                ) : (
              // 照理說不會有這裡的情況，每一個都會回傳資料，只是因為尚未串接時，假資料只有幾格，所以會用到這裡
                  <div
                    className="test-final"
                    ref={refSetter}
                    style={schedule.findIndex(target) !== -1 ? { background: '#FEDD02' } : { background: '#FFF' }}
                  />
                )
            );
          }}
        />
      </div>
      <div
        className="name-block-final"
        style={style}
      >
        <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '10px' }}>
          Member List
          {' '}
          <Tooltip title="You can hide specific users' available time by clicking their names">
            <InfoCircleOutlined style={{ marginLeft: '5px' }} />
          </Tooltip>
        </div>
        {memberList.map((member) => (
          removeList.includes(member)
            ? (<p onClick={() => unCrossMember(member)} style={{ textDecoration: 'line-through', color: 'gray', cursor: 'pointer' }}>{member}</p>)
            : (<p onClick={() => crossMember(member)} style={{ cursor: 'pointer' }}>{member}</p>)
        ))}
      </div>
      <div
        className="name-block-final"
        style={styleBlock}
      >
        {
        switchPriority ? (
          <>
            <p style={{ fontSize: '15px' }}><span style={{ fontWeight: 'bold' }}>Prefer</span></p>
            {selectedList[chosenDate].priority.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            <p style={{
              marginTop: '20px', width: '90px', fontSize: '15px',
            }}
            >
              <span style={{ fontWeight: 'bold' }}>Not Prefer</span>
            </p>
            {selectedList[chosenDate].normal.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            <p style={{
              marginTop: '20px', width: '110px', fontSize: '15px',
            }}
            >
              <span style={{ fontWeight: 'bold' }}>Not Available</span>
            </p>
            {selectedList[chosenDate].notAvailable.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
          </>
        ) : (
          <>
            <p style={{ fontSize: '15px' }}><span style={{ fontWeight: 'bold' }}>Available</span></p>
            {selectedList[chosenDate].priority.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            {selectedList[chosenDate].normal.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            <p style={{
              marginTop: '20px', width: '110px', fontSize: '15px',
            }}
            >
              <span style={{ fontWeight: 'bold' }}>Not Available</span>
            </p>
            {selectedList[chosenDate].notAvailable.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
          </>
        )
      }
      </div>
    </div>
  );
}
