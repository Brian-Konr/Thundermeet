import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

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
        <Route path="/" element={<Home />} />
        <Route exact path="/event_time" element={<EventTimePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
