/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable brace-style */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import { Switch } from 'antd';

import './CalendarForDisplay.css';

export default function CalendarForDisplay() {
  // params start
  const startTime = 0; // form's start hour
  const endTime = 6; // form's end hour
  const type = 'date'; // form's display type: weekday or date
  const startDate = new Date(); // form's start date(if weekday, weekday switch to the nearest date)
  const numOfDays = 7; // continue number of days(for both weekday & date)
  const memberList = ['小陳', '小王', '小葉', '小郭'];
  const selectedList = {};
  // fake data
  selectedList[new Date(2022, 4, 2, 0, 0, 0)] = {
    normal: ['小陳', '小王'],
    priority: ['小葉', '小郭'],
    notAvailable: [],
  };
  selectedList[new Date(2022, 4, 2, 0, 30, 0)] = {
    normal: ['小陳', '小王'],
    priority: ['小郭'],
    notAvailable: ['小葉'],
  };
  selectedList[new Date(2022, 4, 2, 1, 0, 0)] = {
    normal: ['小陳'],
    priority: ['小郭'],
    notAvailable: ['小王', '小葉'],
  };
  selectedList[new Date(2022, 4, 3, 0, 0, 0)] = {
    normal: [],
    priority: ['小郭'],
    notAvailable: ['小陳', '小王', '小葉'],
  };
  selectedList[new Date(2022, 4, 3, 0, 30, 0)] = {
    normal: [],
    priority: [],
    notAvailable: ['小陳', '小王', '小葉', '小郭'],
  };
  // params end

  const [format, setFormat] = useState('M/D');
  const [removeList, setRemoveList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [style, setStyle] = useState({ display: 'flex' });
  const [styleBlock, setStyleBlock] = useState({ display: 'none' });
  const [chosenDate, setChosenDate] = useState(Object.keys(selectedList)[0]);
  const [switchPriority, setSwitchPriority] = useState(true);

  useEffect(() => {
    if (type === 'weekday') {
      setFormat('ddd');
    }
  }, []);

  useEffect(() => {
    setColorList([]);
    const len = memberList.length - removeList.length;
    if (len !== 0) {
      for (let i = 0; i <= len; i += 1) {
        setColorList((oldColorList) => [...oldColorList, (0.1 + (0.9 / len) * i)]);
      }
    }
    else {
      setColorList([0.1]);
    }
  }, [removeList]);

  const crossMember = (member) => {
    console.log('cross member');
    setRemoveList((oldRemoveList) => oldRemoveList.concat(member));
  };

  const unCrossMember = (member) => {
    console.log('unCross member');
    setRemoveList(removeList.filter((item) => item !== member));
  };

  const switchChange = (checked) => {
    console.log(checked);
    setSwitchPriority(checked);
  };

  return (
    <div style={{
      width: '580px', height: '520px', marginLeft: '80px', borderTop: '1px solid #F8F8F8', marginTop: '30px',
    }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', height: '140px', width: '40px', marginTop: '80px',
      }}
      >
        <p style={{ paddingLeft: '8px' }}>
          {memberList.length - removeList.length}
          /
          {memberList.length - removeList.length}
        </p>
        <div
          className="amount-block"
        />
        <p style={{ paddingLeft: '8px' }}>
          {memberList.length - memberList.length}
          /
          {memberList.length - removeList.length}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Switch
          defaultChecked
          onChange={switchChange}
          style={{
            marginTop: '-260px',
            marginLeft: '90px',
            ...(switchPriority ? { background: '#01A494' } : { background: '#B8B8B8' }),
          }}
        />
        <h4 style={{ marginTop: '-260px', marginLeft: '10px' }}>Consider Preference</h4>
      </div>
      <div style={{
        width: '450px', height: '520px', overflow: 'auto', marginTop: '-27vh', marginLeft: '4vw',
      }}
      >
        <ScheduleSelector
          numDays={numOfDays}
          minTime={startTime}
          maxTime={endTime}
          startDate={startDate}
          dateFormat={format}
          timeFormat="H:mm"
          columnGap="0px"
          rowGap="0px"
          hourlyChunks={2}
          renderDateCell={(date, selected, refSetter) => {
            const target = (element) => element.toString() === date.toString();
            let size;
            if (Object.keys(selectedList).findIndex(target) !== -1) {
              const normalSize = selectedList[date].normal
                .filter((i) => !removeList.includes(i)).length;
              const prioritySize = selectedList[date].priority
                .filter((i) => !removeList.includes(i)).length;
              size = normalSize + prioritySize;
            }
            return (
              (Object.keys(selectedList).findIndex(target) !== -1)
                ? (
                  <div
                    className="time-block"
                    style={size === 0 ? { background: '#FFF' } : { opacity: colorList[size] }}
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
                    className="test"
                    ref={refSetter}
                  />
                )
            );
          }}
        />
      </div>
      <div
        className="name-block"
        style={style}
      >
        {memberList.map((member) => (
          removeList.includes(member)
            ? (<p onClick={() => unCrossMember(member)} style={{ textDecoration: 'line-through', color: 'gray' }}>{member}</p>)
            : (<p onClick={() => crossMember(member)}>{member}</p>)
        ))}
      </div>
      <div
        className="name-block"
        style={styleBlock}
      >
        {
        switchPriority ? (
          <>
            <p style={{ fontSize: '15px' }}><span style={{ background: 'linear-gradient(transparent 40%,rgba(255,255,255,0) 40%, #FEDD02 90%,transparent 95%)' }}>Prefer</span></p>
            {selectedList[chosenDate].priority.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            <p style={{
              marginTop: '20px', width: '90px', fontSize: '15px',
            }}
            >
              <span style={{ background: 'linear-gradient(transparent 40%,rgba(255,255,255,0) 40%, #FFFADA 90%,transparent 95%)' }}>Not Prefer</span>
            </p>
            {selectedList[chosenDate].normal.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
            <p style={{
              marginTop: '20px', width: '110px', fontSize: '15px',
            }}
            >
              <span style={{ background: 'linear-gradient(transparent 40%,rgba(255,255,255,0) 40%, #EDEDED 90%,transparent 95%)' }}>Not Available</span>
            </p>
            {selectedList[chosenDate].notAvailable.map((name) => (
              removeList.includes(name)
                ? (<></>) : (<p>{name}</p>)
            ))}
          </>
        ) : (
          <>
            <p style={{ fontSize: '15px' }}><span style={{ background: 'linear-gradient(transparent 40%,rgba(255,255,255,0) 40%, #ECFCFA 90%,transparent 95%)' }}>Available</span></p>
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
              <span style={{ background: 'linear-gradient(transparent 40%,rgba(255,255,255,0) 40%, #EDEDED 90%,transparent 95%)' }}>Not Available</span>
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
