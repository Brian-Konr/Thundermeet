import { gapi } from 'gapi-script';

export default async function GetGoogleCalendarResponse() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_CLIENT_API_KEY;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar profile email https://www.googleapis.com/auth/calendar.events';

  const max = new Date('2022-04-04').toISOString();
  const min = new Date('2022-04-01').toISOString();

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
          const basicProfile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          const request = gapi.client.request({
            path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            params: {
              singleEvents: true,
              timeMax: max,
              timeMin: min,
              orderBy: 'startTime',
            },
          });
          request.execute((res) => {
            resolve([res.items, basicProfile]);
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
