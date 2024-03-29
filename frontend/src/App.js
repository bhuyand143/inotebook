import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useState } from 'react';
import Alert from './components/Alert';
import Landpage from './components/Landpage';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
           <Alert alert={alert}/>
            <Routes>
              <Route exact path='/' element={<Landpage/>} />
              <Route exact path='/home' element={<Home  showAlert={showAlert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>} />
            </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
