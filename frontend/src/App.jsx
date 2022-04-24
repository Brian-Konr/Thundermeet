import Home from './routes/Home/Home';
import PersonalPage from './routes/PersonalPage';
import Navbar from './components/Navbar/Navbar';
import 'antd/dist/antd.css'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/personal' element={<PersonalPage />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
