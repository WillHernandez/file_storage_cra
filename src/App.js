import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomAuth from './components/CustomAuth'
import BurgerMenu from './components/BurgerMenu'
import FileInput from './components/FileInput'
import ProtectedRoutes from './components/ProtectedRoutes';
import { useGlobalState } from './state/state';

const App = () => {
  const newUser = useGlobalState('user')[0]

  return(
    <Router>
      <Routes>
        <Route path='/' element={<CustomAuth />}/>      
        <Route path='/profile' element={
        <ProtectedRoutes user={newUser}>
          <BurgerMenu />
          <FileInput />
          <CustomAuth />
        </ProtectedRoutes>}/>
      </Routes>
    </Router>
  )
}

export default App;
