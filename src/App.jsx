import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import ConfirmTimePage from './routes/ConfirmTimePage/ConfirmTimePage';
import Connect from './routes/Connect';
import EventTimePage from './routes/EventTimePage/EventTimePage';
import Home from './routes/Home/Home';
import PersonalPage from './routes/PersonalPage';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/personal" element={<PersonalPage />} />
        <Route exact path="/connect-test" element={<Connect />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/event_time" element={<EventTimePage />} />
        <Route exact path="/confirm_time" element={<ConfirmTimePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
