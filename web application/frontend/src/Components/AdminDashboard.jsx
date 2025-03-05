import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import "./AdminDashboard.css";



const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5215/api/events");
        setEvents(response.data); // Set the fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);


    const handleDelete = async (id) => {
      try {
          const response = await fetch(`http://localhost:5215/api/events/${id}`, {
              method: 'DELETE',
          });
          if (response.ok) {
              alert("Event deleted successfully");
              // Remove the event from the local state
              setEvents(events.filter(event => event.id !== id));
          } else {
              alert("Error deleting event");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };
  


  const goToAddEventPage = () => {
    navigate("/add-event");
  };

  const goTostudentlist = () => {
    navigate("/studentlist");
  };

  const goTomainpage = () => {
    navigate("/login");
  };
  const handleUpdate = (id) => {
    navigate(`/update-event/${id}`, { state: { event: selectedEvent } });
  };
  
  

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard-content">
        {/* Event List Section */}
        <div className="card event-list">
          <h2>Event List</h2>
          <table>
            <thead>
              <tr>
                <th>select Event</th>
                <th>ID</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Discription</th>
                <th>Event Venuu</th>
                <th>Event Time</th>
                <th>Event Contact</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}
                onClick={() => setSelectedEvent(event)} // Set selected event
                className={
                  selectedEvent && selectedEvent.id === event.id
                    ? "selected-row"
                    : ""
                }>
                   <td>
                    <input
                      type="radio"
                      name="selectedEvent"
                      checked={selectedEvent && selectedEvent.id === event.id}
                      readOnly
                    />
                  </td>
                  <td>{event.id}</td>
                  <td>{event.name}</td>
                  <td>{format(new Date(event.date), 'yyyy-MM-dd')}</td>
                  <td>{event.description}</td>
                  <td>{event.venue}</td>
                  <td>{event.time}</td>
                  <td>{event.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>

      <footer className="dashboard-footer">
        <button onClick={goToAddEventPage}>Add Event</button>
        <button onClick={goTostudentlist}>Go to Student List </button>
        <button onClick={goTomainpage}>Logout</button>
        <button onClick={() => selectedEvent ? handleDelete(selectedEvent.id) : alert("Please select an event")}>
        
         Delete Selected Event</button>
         <button onClick={() => selectedEvent ? handleUpdate(selectedEvent.id): alert("Please select an event")}>
         Update</button>
      </footer>
    </div>
  );
};

export default Dashboard;



