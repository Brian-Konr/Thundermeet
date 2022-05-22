import { gapi } from 'gapi-script';

export default async function exportToGoogle(summary, description, scheduleArr, setLoading) {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_CLIENT_API_KEY;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar profile email https://www.googleapis.com/auth/calendar.events';

  function apiRequest(eventObj) {
    return new Promise((resolve) => {
      const request = gapi.client.request({
        path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        method: 'POST',
        body: eventObj,
      });
      request.execute((res) => {
        // resolve([res.items, basicProfile]);
        resolve(res);
      });
    });
  }

  const response = new Promise((resolve) => {
    gapi.load('client:auth2', () => {
      console.log('loading client!');
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        console.log('loading succeeded!');
        gapi.auth2.getAuthInstance().signIn().then((loginData) => {
          setLoading(true);
          console.log('Successfully login! User login data: ', loginData);
          const allEventsRes = scheduleArr.map((period) => ({
            summary,
            description,
            start: {
              dateTime: period.start,
              timezone: 'Asia/Taipei',
            },
            end: {
              dateTime: period.end,
              timezone: 'Asia/Taipei',
            },
          })).map((e) => apiRequest(e).then((res) => res));
          Promise.all(allEventsRes).then((results) => {
            resolve(results);
          });
        });
      });
    });
  });
  return response.then((value) => {
    console.log('return with user calendar response!');
    return value;
  });
}
