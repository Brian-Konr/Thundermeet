import { useEffect, useState } from 'react';
// import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

export default function Connect() {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_CLIENT_API_KEY;
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/calendar profile email';

  const max = new Date('2022-04-04').toISOString();
  const min = new Date('2022-04-01').toISOString();
  // const min = new Date('2022-04-01').toISOString();

  // const handleSuccess = (res) => {
  //   console.log(res);
  // };

  // const handleFailure = (err) => {
  //   console.log(err);
  // };

  useEffect(() => {
    setLogin(false);
    // gapi.signin2.render('google-sign-in-button', {
    //   scope: ['profile', SCOPES].join(' '),
    //   width: 300,
    //   height: 50,
    //   longtitle: true,
    //   onsuccess: handleSuccess,
    //   onfailure: handleFailure,
    // });
  }, []);
  const handleClick = () => {
    gapi.load('client:auth2', async () => {
      console.log('loaded client');

      gapi.auth2.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scopes: SCOPES,
      }).then(() => {
        // console.log(gapi.auth2.getAuthInstance());
        gapi.auth2.getAuthInstance().signIn().then(async () => {
          const basicProfile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
          setAvatar(basicProfile.getImageUrl());
          setName(basicProfile.getName());
          setLogin(true);
          const res = await gapi.client.request({
            path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            params: {
              singleEvents: true,
              timeMax: max,
              timeMin: min,
              orderBy: 'startTime',
            },
          });
          console.log(res);
        });
      });
    });
  };

  return (
    <div style={{
      width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <h1 style={{ fontSize: '40px' }}>{login ? `Welcome ${name}` : 'Hello Google API!'}</h1>
      {/* <div id="google-sign-in-button" /> */}
      {
        !login && (
          <button type="button" onClick={handleClick} disabled={login}>{login ? 'Connected!' : 'Connect'}</button>
        )
      }
      {
        login && (
        <>
          <h2>Your Image!</h2>
          <img src={avatar} alt="logged in user" />
        </>
        )
      }
    </div>
  );
}
