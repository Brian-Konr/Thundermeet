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

import './CalendarForImport.css';

export default function CalendarForImport({
  schedule, startTime, endTime, type, startDate, numOfDays,
}) {
  const [format, setFormat] = useState('M/D');

  useEffect(() => {
    if (type === 'DAYS') {
      setFormat('ddd');
    }
  }, []);

  return (
    <div style={{
      width: '580px', height: '520px', marginLeft: '80px', marginTop: '30px',
    }}
    >
      <div style={{
        width: '450px', height: '520px', overflow: 'auto', marginLeft: '-3vw',
      }}
      >
        <ScheduleSelector
          selection={schedule}
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
            return (
              <div
                className="time-block-import"
                ref={refSetter}
                style={schedule.findIndex(target) !== -1 ? { background: '#FEDD02' } : { background: '#FFF' }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
