import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import AddEventPage from './routes/AddEvent/AddEventPage';
import ConfirmTimePage from './routes/ConfirmTimePage/ConfirmTimePage';
import EditEventPage from './routes/EditEvent/EditEventPage';
import EventTimePage from './routes/EventTimePage/EventTimePage';
import FinalTimePage from './routes/FinalTimePage/FinalTimePage';
import GroupPage from './routes/GroupPage/GroupPage';
import Home from './routes/Home/Home';
import PersonalPage from './routes/PersonalPage/PersonalPage';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/personal" element={<PersonalPage />} />
        <Route exact path="/event-time/:eventID" element={<EventTimePage />} />
        <Route exact path="/confirm-time/:eventID" element={<ConfirmTimePage />} />
        <Route exact path="/final-time" element={<FinalTimePage />} />
        <Route exact path="/add-event" element={<AddEventPage />} />
        <Route exact path="/edit-event/:eventID" element={<EditEventPage />} />
        <Route exact path="/group/:groupID" element={<GroupPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
