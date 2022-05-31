# Thundermeet
Thundermeet 是針對有相約時間需求的用戶，我們提供 Google 行事曆和內部活動間的匯入匯出、參與時間優先度區分、簡便篩選特定參與者或時間優先度、個人頁面活動整合等功能，透過 Thundermeet 的平台，我們希望能有效解決使用者在相約時間時會遇到的困擾，給用戶在過程中更好的使用者體驗。

## Motivation
motivation...

## Getting Started

1. clone this repository
  ```
  git clone https://github.com/Brian-Konr/Thundermeet.git
  ```
2. `cd` to this repository
3. In the root of this repository, add the env file named `.env.development`. Within the file, you should put in the following environment variables:
  ```
  VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
  VITE_GOOGLE_CLIENT_API_KEY=YOUR_GOOGLE_CLIENT_API_KEY
  VITE_BACKEND_URL=https://thundermeet-backend.herokuapp.com
  VITE_FRONTEND_URL=localhost:3000
  ```
  > Reminder: If you don't have your own Google Client ID and API key, you can still execute this app without using any of the Google OAuth features the app provides.
4. Open your terminal and run `yarn` to install the [dependencies](package.json)
5. In the same terminal, run `yarn dev` to run the app in the development mode
6. voilà! you should see a brand new Thundermeet running in your localhost

  > Notice: If the terminal reports error about the dependency problem after you execute `yarn dev`, you may fix it by commenting the 3rd line on `node_modules/react-schedule-selector/dist/ScheduleSelector.js`
## Features
features...

## Dependencies / Resources
### User Interface / User Experience
* [Ant Design of React](https://ant.design/docs/react/introduce)
* [Flaticon](https://www.flaticon.com/) / [Ant Design Icons](https://ant.design/docs/spec/icon)
### Web Framework and Services
* [Vite](https://vitejs.dev/)
* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)
* [Axios](https://axios-http.com/docs/intro)
* [date-fns](https://date-fns.org/)
* [react-schedule-selector](https://github.com/bibekg/react-schedule-selector)
* [gapi-script](https://www.npmjs.com/package/gapi-script)

## Contributors

資管三 B08705038 郭子麟 
> [Brian Konr](https://github.com/Brian-Konr), User Interface / Web Services / Project Manager

資管三 B08705004 王亭勻
> [Christine Wang](https://github.com/christine891225), User Interface / User Experience

資管三 B08705026 陳沛妤
> [Peifish Chen](https://github.com/peifish1124), User Interface / User Experience


## Deployment Link
[Thundermeet](https://thundermeet.netlify.app/)

*Thundermeet, faster meet*
