import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomAuth from './components/CustomAuth'
import BurgerMenu from './components/BurgerMenu'
import FileInput from './components/FileInput'
import ProtectedRoutes from './components/ProtectedRoutes';
import MainRoutes from './components/MainRoutes';
import { useGlobalState } from './state/state';
import Cookies from 'js-cookie';

const App = () => {
  const newUser = useGlobalState('user')[0]
  const userCookie = Cookies.get('username')

  return(
    <Router>
      <Routes>

        <Route path='/' element={
        <MainRoutes user={newUser} userCookie={userCookie}>
          <CustomAuth />
        </MainRoutes>}/>

        {/* <Route path='/' element={<CustomAuth />}/> */}

        <Route path='/profile' element={
        <ProtectedRoutes user={newUser} userCookie={userCookie}>
          <BurgerMenu />
          <FileInput />
          <CustomAuth />
        </ProtectedRoutes>}/>
      </Routes>
    </Router>
  )
}

export default App;
