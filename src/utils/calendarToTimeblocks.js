export default function calendarToTimeblocks(googleEvents, startDate, startTime, endDate, endTime) {
  const startTimeStr = startTime < 10 ? `0${startTime}` : `${startTime}`;
  const endTimeStr = endTime < 10 ? `0${endTime}` : `${endTime}`;
  const min = new Date(`${startDate.slice(0, 10)}T${startTimeStr}:00`);
  const max = new Date(`${endDate.slice(0, 10)}T${endTimeStr}:01`);
  function process(date, startOrEnd) {
    const minutes = 30;
    const ms = 1000 * 60 * minutes;
    if (startOrEnd === 'start') return new Date(Math.floor(date.getTime() / ms) * ms);
    return new Date(Math.ceil(date.getTime() / ms) * ms);
  }
  if (googleEvents.length > 0) {
    const ans = [];
    googleEvents.forEach((event) => {
      const start = process(new Date(event.start.dateTime), 'start');
      const end = process(new Date(event.end.dateTime), 'end');
      let temp = start;
      while (temp < end) {
        ans.push(temp);
        temp = new Date(temp.getTime() + 30 * 60000);
      }
    });
    return ans
      .filter((timeblock) => timeblock >= min
        && timeblock <= max
        && timeblock.getHours() >= startTime
        && timeblock.getHours() < endTime);
  }
  return [];
}
