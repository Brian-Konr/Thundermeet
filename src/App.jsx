import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import AddEventPage from './routes/AddEvent/AddEventPage';
import ConfirmTimePage from './routes/ConfirmTimePage/ConfirmTimePage';
import Connect from './routes/Connect';
import EditEventPage from './routes/EditEvent/EditEventPage';
import EventTimePage from './routes/EventTimePage/EventTimePage';
import FinalTimePage from './routes/FinalTimePage/FinalTimePage';
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
        <Route exact path="/event_time" element={<EventTimePage />} />
        <Route exact path="/confirm_time" element={<ConfirmTimePage />} />
        <Route exact path="/final_time" element={<FinalTimePage />} />
        <Route exact path="/add_event" element={<AddEventPage />} />
        <Route exact path="/edit_event" element={<EditEventPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
