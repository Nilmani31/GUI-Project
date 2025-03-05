import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';



import "./EventList.css";






const EventList = ({ }) => {
   // Store events from backend
   const [events, setEvents] = useState([]); // Store events from backend
   const [loading, setLoading] = useState(true);
  
  
  let searchTerm = "";
  
  

  const navigate = useNavigate();
 useEffect(() => {
  
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5215/api/events"); // Adjust URL as needed
        
        setEvents(response.data); // Store fetched events
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


 
  const handleEventClick = (event) => {
    // You can navigate to /register and pass the event data
    navigate("/register", { state: { event } });
  };
  const handleViewDetails = (event) => {
    navigate("/discription", { state: { event } });
  };

  

  // Function to handle input change
  const handleSearchChange = (e) => {
    searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll(".event-box").forEach((eventBox) => {
      const eventName = eventBox.querySelector("h3").textContent.toLowerCase();
      if (!eventName.includes(searchTerm)) {
        eventBox.style.display = "none";  //Hide non-matching events
      } else {
        eventBox.style.display = "block"; //Show matching events
      }
    });
    
  };
 const handleLogout = () => {
    navigate("/login");
    alert("Logging out...");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };
  const handlecart = () => {
    navigate("/Cart");
    
  };
  



  return (
    <div className="event-page">
      <div className="header">
        <h1>Welcome to EngiEvent!</h1>
        <div
          className="profile-section"
          onMouseLeave={() => setShowDropdown(false)}
        >
        
          <img
            src="profile.png"
            alt="Profile"
            className="profile-icon"
            onMouseEnter={handleProfileClick}
            
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          )}
         
       
        </div>
        <button className="cart-button" onClick={handlecart}>
            <img src="cart.png" alt="Cart" className="cart-icon" />
            Cart
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Events "
          onChange={handleSearchChange}
        />
        
        
      </div>
      <div className="event-container">
        <div className="event-image">
          <img
            src="girl-8601996_640.webp"
            alt="Event Banner"
            className="event-banner"
          />
        </div>
        <div className="event-list-container">
          <h2>Available Events</h2>
          <div className="event-grid">
            {events.map((event) => (
              
              <div key={event.id} className="event-box">
                <h3>{event.name}</h3>
                <p>{format(new Date(event.date), 'yyyy-MM-dd')}</p>
                
                
                <button onClick={() => handleViewDetails(event)}>View More Details</button>

              </div>
            ))}
          </div>
          <div className="scholarships">
          <h2>Win Exciting Prizes</h2>
          <p className="prize">Participate in events and stand a chance to win scholarships, internships, and more!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;




