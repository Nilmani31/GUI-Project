import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./AddEventForm.css"


const AddEventForm = ({ addEvent }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDscription, setEventDiscription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventContact, setEventContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventName && eventDate) {
      try {
        // Send event details to the backend
        const response = await axios.post("http://localhost:5215/api/events", {
          name: eventName,
          date: eventDate,
          description: eventDscription,
          venue: eventVenue,
          time: eventTime,
          contact: eventContact,
        });

        if (response.status === 200) {
          alert("Event added successfully!");
          // Clear the form fields
          setEventName("");
          setEventDate("");
          setEventDiscription("");
          setEventVenue("");
          setEventTime("");
          setEventContact("");

          // Refresh the event list on success
          if (refreshEventList) {
            refreshEventList();
          }
          navigate("/eventlist"); // Redirect to event list
        }
      } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add event. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };



  const backTodash = () => {
    navigate("/admin-dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="add-event-container">
      <h1 className="form-title">Add New Event</h1>
      <form className="event-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter the event name"
            required
          />
        </label>
        <label className="form-label">
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Event Discription:
          <input
            type="text"
            value={eventDscription}
            onChange={(e) => setEventDiscription(e.target.value)}
            required
          />
          <label className="form-label">
          Event venue:
          <input
            type="text"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Event Time:
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Event Contact:
          <input
            type="text"
            value={eventContact}
            onChange={(e) => setEventContact(e.target.value)}
            required
          />
        </label>
        </label>
        <div className="form-buttons">
          <button className="blue-button" type="submit">
            Add Event
          </button>
          <button
            className="blue-button back-button"
            type="button"
            onClick={backTodash}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;