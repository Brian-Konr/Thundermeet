/* eslint-disable brace-style */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';

export default function Calendar() {
  // params
  const startTime = 0; // form's start hour
  const endTime = 10; // form's end hour
  const enablePriority = true; // creator enable priority or not
  const type = 'date'; // form's display type: weekday or date
  const startDate = new Date(); // form's start date(if weekday, weekday switch to the nearest date)
  const numOfDays = 7; // continue number of days(for both weekday & date)

  const [schedule, setSchedule] = useState([]);
  const [format, setFormat] = useState('M/D');
  const [priority, setPriority] = useState(false);

  // output(2 arrays & user_id)
  const [normalDay, setNormalDay] = useState([]);
  const [priorityDay, setPriorityDay] = useState([]);

  useEffect(() => {
    if (type === 'weekday') {
      setFormat('ddd');
    }
  }, []);

  const handleChange = (newSchedule) => {
    let addCell = [];
    let removeCell = [];
    if (newSchedule.length >= schedule.length) {
      addCell = newSchedule.filter((item) => !schedule.includes(item));
      // console.log('addCell', addCell);
    } else {
      removeCell = schedule.filter((item) => !newSchedule.includes(item));
      // console.log('removeCell', removeCell);
    }
    setSchedule(newSchedule);

    if (!priority) {
      // rewrite
      if (priorityDay.some((item) => removeCell.includes(item))) {
        setPriorityDay(priorityDay.filter((item) => !removeCell.includes(item)));
        const unduplicateRemoveNormal = removeCell.filter((i) => !normalDay.includes(i));
        setNormalDay((normalDay) => normalDay.concat(unduplicateRemoveNormal));
        setSchedule((schedule) => schedule.concat(removeCell));
      }
      // add
      else if (addCell.length !== 0) {
        setNormalDay((normalDay) => normalDay.concat(addCell));
      }
      // remove
      else {
        setNormalDay(normalDay.filter((item) => !removeCell.includes(item)));
      }
    } else {
      // rewrite
      if (normalDay.some((item) => removeCell.includes(item))) {
        setNormalDay(normalDay.filter((item) => !removeCell.includes(item)));
        const unduplicateRemovePriority = removeCell.filter((i) => !priorityDay.includes(i));
        setPriorityDay((priorityDay) => priorityDay.concat(unduplicateRemovePriority));
        setSchedule((schedule) => schedule.concat(removeCell));
      }
      // add
      else if (addCell.length !== 0) {
        setPriorityDay((priorityDay) => priorityDay.concat(addCell));
      }
      // remove
      else {
        setPriorityDay(priorityDay.filter((item) => !removeCell.includes(item)));
      }
    }
  };

  const clickPriority = () => {
    console.log('priority brush');
    setPriority(true);
  };

  const clickNormal = () => {
    console.log('normal brush');
    setPriority(false);
  };

  useEffect(() => {
    console.log('normal:', normalDay);
    console.log('priority:', priorityDay);
    console.log('selected:', schedule);
  }, [normalDay, priorityDay]);

  return (
    <div style={{ width: '580px', height: '510px' }}>
      {enablePriority
        ? (
          <>
            <div
              style={{
                width: '40px', height: '40px', background: '#FEDD02', marginTop: '7vh', marginLeft: '2vw',
              }}
              onClick={clickPriority}
            />
            <div style={{ marginLeft: '2vw', marginTop: '1vh' }}>
              Prefer
            </div>
            <div
              style={{
                width: '40px', height: '40px', background: '#FFFADA', marginTop: '3vh', marginLeft: '2vw',
              }}
              onClick={clickNormal}
            />
            <div style={{ marginLeft: '1vw', marginTop: '1vh' }}>
              Not Prefer
            </div>

          </>
        )
        : (
          <div
            style={{
              width: '40px', height: '40px', background: '#FFF', marginTop: '23vh', marginLeft: '2vw',
            }}
          />

        )}

      <div style={{
        width: '450px', height: '500px', overflow: 'auto', marginTop: '-27vh', marginLeft: '7vw',
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
          onChange={handleChange}
          columnGap="0px"
          rowGap="0px"
          hourlyChunks={2}
          renderDateCell={(date, selected, refSetter) => {
            const filter = (element) => element.getTime() === date.getTime();
            return (
              (priorityDay.findIndex(filter) !== -1)
                ? (
                  <div
                    style={{
                      height: '40px', border: '1px solid #E0E0E0', background: '#FEDD02',
                    }}
                    ref={refSetter}
                  />
                ) : (
                  <div
                    style={{
                      height: '40px', border: '1px solid #E0E0E0', background: selected ? '#FFFADA' : '#FFF',
                    }}
                    ref={refSetter}
                  />
                )
            );
          }}
        />
      </div>
    </div>
  );
}
