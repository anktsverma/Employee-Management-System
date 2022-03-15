import Navbar from './components/Navbar';
import { Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
         <Route path="/" element={<Login/>} exact/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
