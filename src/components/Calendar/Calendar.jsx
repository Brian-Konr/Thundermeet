/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector';

export default function Calendar({
  schedule, setSchedule, startTime, endTime, type, startDate, numOfDays, enablePriority, normalDay, setNormalDay, priorityDay, setPriorityDay, exportTime, setTimeList,
}) {
  const [format, setFormat] = useState('M/D');
  const [priority, setPriority] = useState(false);

  useEffect(() => {
    if (type === 'DAYS') {
      setFormat('ddd');
    }
    if (enablePriority) {
      setPriority(true);
    }
  }, []);

  useEffect(() => {
    setPriorityDay(priorityDay.filter((item) => !exportTime.includes(item)));
    setNormalDay(normalDay.filter((item) => !exportTime.includes(item)));
  }, [exportTime]);

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

  // useEffect(() => {
  //   console.log('normal:', normalDay);
  //   console.log('priority:', priorityDay);
  //   // console.log('selected:', schedule);
  // }, [normalDay, priorityDay]);

  const arr = [];
  useEffect(() => {
    setTimeList(arr);
  }, []);

  return (
    <div style={{
      width: '580px', height: '520px', marginLeft: '30px', borderTop: '1px solid #F8F8F8', marginTop: '30px',
    }}
    >
      {enablePriority
        ? (
          <>
            <div
              style={{
                width: '40px', height: '40px', background: '#FEDD02', marginTop: '7vh', marginLeft: '2vw',
              }}
              onClick={clickPriority}
            />
            {priority
              ? (
                <div style={{
                  marginLeft: '1.5vw', marginTop: '1vh', width: '60px', paddingLeft: '10px', borderRadius: '16px', background: '#ECFCFA', border: '1px solid #01A494',
                }}
                >
                  Prefer
                </div>
              ) : (
                <div style={{
                  marginLeft: '1.5vw', marginTop: '1vh', width: '60px', paddingLeft: '10px',
                }}
                >
                  Prefer
                </div>
              )}

            <div
              style={{
                width: '40px', height: '40px', background: '#FFFADA', marginTop: '3vh', marginLeft: '2vw',
              }}
              onClick={clickNormal}
            />
            {priority
              ? (
                <div style={{
                  marginLeft: '0.5vw', marginTop: '1vh', width: '85px', paddingLeft: '9px',
                }}
                >
                  Not Prefer
                </div>
              ) : (
                <div style={{
                  marginLeft: '0.5vw', marginTop: '1vh', width: '85px', paddingLeft: '9px', borderRadius: '16px', background: '#ECFCFA', border: '1px solid #01A494',
                }}
                >
                  Not Prefer
                </div>
              )}

          </>
        )
        : (
          <>
            <div
              style={{
                width: '40px', height: '40px', background: '#FFFADA', marginTop: '15vh', marginLeft: '2vw',
              }}
              onClick={clickNormal}
            />
            <div style={{
              marginLeft: '1vw', marginTop: '1vh', width: '85px', paddingLeft: '9px',
            }}
            >
              Available
            </div>
          </>

        )}

      <div style={{
        width: '450px', height: '520px', overflow: 'auto', marginTop: '-27vh', marginLeft: '7vw',
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
            arr.push(date);
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
