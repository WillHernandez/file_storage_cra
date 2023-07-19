import './App.css';
import CustomAuth from './components/CustomAuth'
import BurgerMenu from './components/BurgerMenu'
import FIleInput from './components/FileInput'

function App() {
  return (
    <div className="App">
      <BurgerMenu />
      <FIleInput />
      <CustomAuth />
    </div>
  );
}

export default App;
