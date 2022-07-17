import { Route,Routes} from 'react-router-dom';
import './App.css';
import LoginAdmin from './pages/AdminLogin';
import Register from './components/Register'
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="App">
     <Routes>
         <Route path="/" element={<EmployeeLogin/>} exact/>
         <Route path="/employee_dashboard" element={<EmployeeDashboard/>}/>
         <Route path="/admin_dashboard" element={<AdminDashboard/>}/>
         <Route path="/login_admin" element={<LoginAdmin/>}/>
         <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
