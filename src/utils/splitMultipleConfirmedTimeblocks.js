export default function split(sortedTime) {
  const events = [];
  let start = sortedTime[0];
  for (let i = 0; i < sortedTime.length - 1; i += 1) {
    const diff = sortedTime[i + 1] - sortedTime[i]; // milliseconds
    const minDiff = Math.floor((diff / 1000) / 60);
    if (minDiff > 30) {
      events.push({
        start: start.toISOString(),
        end: new Date(sortedTime[i].getTime() + 30 * 60000),
      });
      start = sortedTime[i + 1];
    }
  }
  events.push({
    start: start.toISOString(),
    end: new Date(sortedTime[sortedTime.length - 1].getTime() + 30 * 60000).toISOString(),
  });
  return events;
}
