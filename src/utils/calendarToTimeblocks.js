export default function calendarToTimeblocks(googleEvents) {
  if (googleEvents.length > 0) {
    const ans = [];
    googleEvents.forEach((event) => {
      const start = new Date(event.start.dateTime);
      const end = new Date(event.end.dateTime);
      let temp = start;
      while (temp < end) {
        ans.push(temp);
        temp = new Date(temp.getTime() + 30 * 60000);
      }
    });
    return ans;
  }
  return [];
}
