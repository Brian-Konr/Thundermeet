import { gapi } from 'gapi-script';

export default async function getGoogleCalendarResponse(summary, description, start, end) {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_CLIENT_API_KEY;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar profile email https://www.googleapis.com/auth/calendar.events';

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
          console.log('Successfully login! User login data: ', loginData);
          const event = {
            summary,
            description,
            start: {
              dateTime: start,
              timezone: 'Asia/Taipei',
            },
            end: {
              dateTime: end,
              timezone: 'Asia/Taipei',
            },
          };
          const request = gapi.client.request({
            path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            method: 'POST',
            body: event,
          });
          request.execute((res) => {
            // resolve([res.items, basicProfile]);
            resolve(res);
          });
          // gapi.client.calendar.events
          //   .insert({
          //     calendarId: 'primary',
          //     resource: event,
          //   })
          //   .then((res) => {
          //     console.log(res);
          //     resolve(res);
          //   });
        });
      });
    });
  });
  return response.then((value) => {
    console.log('return with user calendar response!');
    return value;
  });
}
