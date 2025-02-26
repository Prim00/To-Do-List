
import SignUp from './Components/SignUp.jsx';
import Login from './Components/Login.jsx';
import NavBar from './Components/NavBar.jsx';
import Home from './Components/Home.jsx';
import Contact from './Components/ContactCompo/Contact.jsx';
import UserPage from './Components/UserPage.jsx';
import UpdatePage from './Components/UpdatePage.jsx'
import ResetPass from './Components/ResetPass.jsx'
import ResetPage from './Components/ResetPage.jsx';

import './App.css'


import { Route , Routes } from 'react-router-dom';



function App() {
  return(
    <>
      <NavBar/>

      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/SignUp' element={<SignUp/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/UserPage' element={<UserPage/>} />
          <Route path='/UpdatePage' element={<UpdatePage/>} />
          <Route path='/ResetPass' element ={<ResetPass/>} />
          <Route path='/ResetPage/:token' element ={<ResetPage/>} />
      </Routes> 

    </>
  );
}

export default App
