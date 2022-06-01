# Thundermeet
Thundermeet 是針對有相約時間需求的用戶所設計的約時間平台，我們提供 Google 行事曆和內部活動間的匯入匯出、參與時間優先度區分、簡便篩選特定參與者或時間優先度、個人頁面活動整合等功能，透過 Thundermeet，我們希望能有效解決使用者在相約時間時會遇到的困擾，給用戶在過程中更好的使用者體驗。

## Motivation
在現今線上線下活動眾多、團隊合作機會也逐漸頻繁的背景下，不論是公事上相約討論或朋友間聚會的機會都逐漸增加。而團隊成員間相約時間時若是使用訊息或投票討論往往需要較高的溝通成本，一來一往的回覆和個人對於各時段的偏好也導致光是約時間就花費不少心力。而雖然市場中現在也有方便大家約時間的平台（如：[When2meet](https://www.when2meet.com)），該類型平台仍存在「無法跨活動統合資訊」、「無法呈現使用者對不同時段的偏好程度」、「無法檢視部分成員共同可行時間」等等痛點。因此我們納入使用者對現有平台的回饋，發想並實作一個更完善的系統以提供更好的使用者體驗。

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
### Register / Login / Password Recovery
使用者以不重複的使用者 ID 作為註冊帳號、並輸入參與活動時顯示名稱。註冊時亦會要求填寫忘記密碼時驗證用的問題（自己就讀的高中或大學校名縮寫），忘記密碼修復機制為輸入使用者 ID 搭配正確驗證問題答案，即可進行密碼更改。
### Personal Page
個人頁面可瀏覽使用者 ID、顯示名稱、忘記密碼驗證問題與答案，亦可修改顯示名稱或登出系統。頁面同時會顯示內建的分類列表及客製的分類列表，同時允許使用者於此新增列表，以便於分類不同類型活動。分類列表詳細說明可參考下一點。
### Default / Personalized Event Groups
允許使用者自行分類不同類型活動，方便各活動的編輯查看。內建分類包含「已發起」（自己發起的活動）、「已參與」（透過別人邀請填寫且的活動）兩類，可以透過設定新增其他分類並加入對應活動。每一分類中皆會再自動分為「進行中」（仍開放編輯、填寫可參與時段）、「已確定」（活動時間已確定，僅供查看結果）兩區塊，方便使用者區別活動狀態。
### Create / Edit / Confirm an Event (as an organizer)
建立活動時可輸入活動名稱、說明、起迄日期與時間區段，亦可選擇是否啟用優先度功能（以「可參與」、「可參與但不偏好此時段」區分不同時段的優先度高低）。待其餘參與者填寫完時間後可選取定案時間。而活動建立後、時間確定前，仍可隨時編輯活動名稱、敘述，以搭配活動變更及微調需求。
### Fill in Personal / View Group Available Times for an Event
若透過連結點入活動並登入後，參與者可在畫面左側針對活動建立的時間範圍填寫可參與時段，若發起者有啟用優先度功能，則以「可參與」、「可參與但不偏好此時段」區分不同時段的優先度高低。雙擊可以清除填寫內容、換畫筆則可覆蓋其他內容。而在畫面右側則會顯示所有填寫者可參與時間。顯示時可選擇是否要考量優先度，而透過點選使用者列表來排除數個參與者，顯示剩餘參與者共同可參與時段。也可以將游標置於特定時間區段，查看該時段的可參與者清單。
### Import / Export Time to Google Calendar
於填寫可參與時間時可以串連第三方 Google 行事曆匯入可參與時間（自動排除行事曆中有活動的時段），匯入前會出現預覽縮圖，確認匯入後可再根據實際狀況進行微調，節省每次都要重新填寫所有時段、比對行事曆的麻煩。待發起人確認活動時間後，使用者亦可匯出至 Google 行事曆，由系統自動新增行事曆行程，整合使用者日常使用記事系統。所有匯入匯出皆為一次性。
### Import / Export Time to Other Thundermeet Events
選擇從系統內其他活動匯入時，若兩者時間有重疊則出現該活動填寫狀況縮圖、確認是否匯入，方便使用者若需填寫多個日期相近的活動參與狀況，不需重複填寫。選擇從第三方行事曆則會自動匯入符合日期的行事曆狀況、亦有縮圖預覽再確認匯入。待發起人確認活動時間後，可選擇「匯出至所有其他活動」，會將所有其他活動有重疊時段的都改為不行參與。所有匯入匯出皆為一次性。

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
