import { useEffect, useState } from 'react';

import exampleResponse from '../utils/googleCalendarResponse';
// import GoogleLogin from 'react-google-login';
import getGoogleCalendarResponse from '../utils/googleConnect';

export default function Connect() {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  // const [calendarResponse, setCalendarResponse] = useState({});

  useEffect(() => {
    setLogin(false);
    console.log(exampleResponse);
  }, []);
  const handleClick = async () => {
    /* google calendar response will return two values, calendar events and basicProfile method */
    const res = await getGoogleCalendarResponse();
    setLogin(true);
    console.log('User calendar response: ', res[0]);
    // setCalendarResponse(res[0]);
    setName(res[1].getName());
    setAvatar(res[1].getImageUrl());
  };

  return (
    <div style={{
      width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <h1 style={{ fontSize: '40px' }}>{login ? `Welcome ${name}` : 'Hello Google API!'}</h1>
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
