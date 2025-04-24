
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/common/Navbar';
import Contact from './Components/common/Contact';
import Nutrition from './Components/Nutrition/Nutrition';
import Workouts from './Components/Workouts/Workouts';
import Profile from './Components/Profile/Profile';
import AllExercise from './Components/Workouts/exercise/AllExercise';
import Indetails from './Components/Workouts/exercise/indetails/Indetails';
const Routess = () => {
    return (
        <Router>
          <div className="">
            <Navbar />
            <Routes>
    
              
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/Nutrition" element={<Nutrition/>} />
              <Route path="/Workouts" element={<Workouts/>} />
              <Route path="/Profile" element={<Profile/>} />
              <Route path="/AllExercise" element={<AllExercise/>} />
              <Route path="/Indetails/:id" element={<Indetails/>} />
              
            
            </Routes>
            <Contact/>
          </div>
        </Router>
      );
};

export default Routess;