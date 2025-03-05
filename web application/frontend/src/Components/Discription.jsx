import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import "./Discription.css"; // Import the stylesheet for this component

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleEventClick = (event) => {
    // Navigate to registration page and pass the event data
    navigate("/register", { state: { event } });
  };
  const event = location.state?.event; // Get event from the navigation state

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-details-container">
      <div className="event-header">
        <h1 className="event-title">{event.name}</h1>
        <p className="event-date">{format(new Date(event.date), 'yyyy-MM-dd')}</p>
      </div>

      <div className="event-info">
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Contact Email:</strong> <a href={`mailto:${event.contact}`} className="contact-link">{event.contact}</a></p>
        <p className="note">Register before the given date!!!</p>
      </div>

      <div className="button-container">
        <button className="register-button" onClick={() => handleEventClick(event)}>
          Register
        </button>
        <button className="back-button" onClick={() => navigate("/eventlist")}>
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default EventDetails;

