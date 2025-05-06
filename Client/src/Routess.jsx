
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/common/Navbar';
import Contact from './Components/common/Contact';
import Nutrition from './Components/Nutrition/Nutrition';
import Workouts from './Components/Workouts/Workouts';
import Profile from './Components/Profile/Profile';
import Progress from './Components/prograss/Progress';
import AllExercise from './Components/Workouts/exercise/AllExercise';
import Indetails from './Components/Workouts/exercise/indetails/Indetails';
import Register from './Components/auth/Register.jsx';
import Login from './Components/auth/Login';
const Routess = () => {
    return (
        <Router>
          <div className="">
            <Navbar />
            <Routes>
    
              
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/" element={<Workouts/>} />
              <Route path="/Nutrition" element={<Nutrition/>} />
              <Route path="/Workouts" element={<Workouts/>} />
              <Route path="/Profile/:id" element={<Profile/>} />
              <Route path="/AllExercise" element={<AllExercise/>} />
              <Route path="/Indetails/:id" element={<Indetails/>} />
              <Route path="/Progress" element={<Progress/>} />
            
              
            
            </Routes>
            <Contact/>
          </div>
        </Router>
      );
};

export default Routess;