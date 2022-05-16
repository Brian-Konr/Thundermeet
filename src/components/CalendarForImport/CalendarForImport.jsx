/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable brace-style */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ScheduleSelector from 'react-schedule-selector';
import { format } from 'date-fns';

import './CalendarForImport.css';

export default function CalendarForImport({
  scheduleNormal, schedulePriority, startTime, endTime, startDate, numOfDays,
}) {
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
          // selection={schedule}
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
              <div
                className="time-block-import"
                ref={refSetter}
                style={schedulePriority.findIndex(target) !== -1 ? { background: '#FEDD02' } : scheduleNormal.findIndex(target) !== -1 ? { background: '#FFFADA' } : { background: '#FFF' }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
