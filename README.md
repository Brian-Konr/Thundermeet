# Thundermeet
summary...

## Motivation
motivation...

## Getting Started

1. clone this repository
  ```
  git clone https://github.com/Brian-Konr/Thundermeet.git
  ```
2. `cd` to this repository
3. In the root of this repository, add the env file named `.env.development`. And with in the file, you should put in:
  ```
  VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
  VITE_GOOGLE_CLIENT_API_KEY=YOUR_GOOGLE_CLIENT_API_KEY
  VITE_BACKEND_URL=https://thundermeet-backend.herokuapp.com
  VITE_FRONTEND_URL=localhost:3000
  ```
  > If you don't have your own Google Client ID and API key, you can still execute this app without using any of the Google OAuth features the app provides.
4. Open your terminal and run `yarn` to install the [dependencies](package.json)
5. In the same terminal, run `yarn dev` to run the app in the development mode
6. voilà! you should see a brand new Thundermeet running in your localhost

If the terminal reports error about the dependency problem, you may fix it by comment the 3rd line on `node modules/react-schedule-selector/dist/ScheduleSelector.js`
## Features
features...

## Dependencies / Resources

### User Interface / User Experience
UI / UX...

### Web Services
React, Axios, React-Router-Dom

### Third Party Services
gapi, Google OAuth 2.0

## Contributors

資管三 B08705038 郭子麟 
> [Brian Konr](https://github.com/Brian-Konr), Web Services / Project Manager

資管三 B08705004 王亭勻
> [Christine Wang](https://github.com/christine891225), User Interface / User Experience

資管三 B08705026 陳沛妤
> [Peifish Chen](https://github.com/peifish1124), User Interface / User Experience
