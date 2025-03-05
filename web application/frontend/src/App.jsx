import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components
import Login from "./Components/Login";
import EventList from "./Components/EventList";
import EventRegistration from "./Components/EventRegistration";
import ChangePassword from "./Components/ChangePassword";
import AdminDashboard from "./Components/AdminDashboard";
import CartPage from "./Components/Cartpage";
import StudentList from "./Components/StudentList";
import AddEventForm from "./Components/AddEventForm";
import AdminLogin from "./Components/AdminLogin";
import Discription from "./Components/Discription";
import AddStudentForm from "./Components/StudentSignupForm";
import UpdateEvent from "./Components/UpdateEvent";



const App = () => {
  
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Cart, setCart] = useState([]); 
  

  const handleLogin = (credentials) => {
    if (credentials.registrationNumber && credentials.password) {
      setIsLoggedIn(true); // Simulate successful login
    } else {
      alert("Invalid login details");
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
 
  // Shared state for registered events

  const addToCart = (event) => {
    setCart((prevCart) => [...prevCart, event]);
  };
 
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { id: prevEvents.length + 1, ...newEvent }]);
  };
  

  return (
    <Router>
      <div className="app">
      
          <Routes>
            <Route path="/event" element={<EventList onEventClick={handleEventClick} />} />
            <Route path="/" element={<Login/>} />
            <Route
              path="/register"
              element={<EventRegistration event={selectedEvent} />}
            />

            <Route
              path="/eventlist"
              element={<EventList />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
             <Route
              path="/add-event"
              element={<AddEventForm />}
            />
            <Route
              path="/studentlist"
              element={<StudentList />}
            />
            <Route
              path="/change-password"
              element={<ChangePassword/>}
            />
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard/>}
            />
            <Route
              path="/admin"
              element={<AdminLogin/>}
            />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/add-event" element={<AddEventForm addEvent={addEvent} />} />
            <Route path="/discription" element={<Discription />} />
            <Route path="/AddStudent" element={<AddStudentForm />} />
            <Route path="/update-event/:id" element={<UpdateEvent />} />
            

            
          </Routes>
      
          
          
       
        
      </div>
    </Router>
  );
};

export default App; 













