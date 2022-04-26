import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './routes/Home/Home';
import PersonalPage from './routes/PersonalPage';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/personal" element={<PersonalPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
