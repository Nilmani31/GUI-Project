import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import "./UpdateEvent.css";

const UpdateEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventDetails = location.state?.event;

  const [updatedEvent, setUpdatedEvent] = useState({
    id: eventDetails?.id || "",
    name: eventDetails?.name || "",
    date: eventDetails?.date? format(new Date(eventDetails.date), "yyyy-MM-dd") : "",
    description: eventDetails?.description || "",
    venue: eventDetails?.venue || "",
    time: eventDetails?.time || "",
    contact: eventDetails?.contact || "",
  });

  useEffect(() => {
    if (!eventDetails) {
      alert("No event selected. Redirecting to dashboard...");
      navigate("/admin-dashboard");
    }
  }, [eventDetails, navigate]);

  const handleChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5215/api/events/${updatedEvent.id}`, updatedEvent);
      alert("Event updated successfully!");
      navigate("/admin-dashboard"); // Redirect back to dashboard
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="update-container">
      <h2>Update Event</h2>
      <form onSubmit={handleUpdateEvent}>
        <label>Event Name:</label>
        <input type="text" name="name" value={updatedEvent.name} onChange={handleChange} required />

        <label>Event Date:</label>
        <input type="date" name="date" value={updatedEvent.date} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={updatedEvent.description} onChange={handleChange} required />

        <label>Venue:</label>
        <input type="text" name="venue" value={updatedEvent.venue} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={updatedEvent.time} onChange={handleChange} required />

        <label>Contact:</label>
        <input type="text" name="contact" value={updatedEvent.contact} onChange={handleChange} required />

        <button type="submit" className="updatebutton">Save Changes</button>
        <button type="button" className="cancel-btn" onClick={() => navigate("/admin-dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
