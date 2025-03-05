import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./EventRegistration.css";

function EventRegistration() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event || {}; // Safely access event or fallback to an empty object

  // State to handle form inputs
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [formError, setFormError] = useState("");
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") setUserName(value);
    if (name === "userEmail") setUserEmail(value);
  };
  

  // Handle form submission
  const handleSubmit = async(e) => {
   e.preventDefault(); // Prevent form from reloading the page

   
    if (!userName || !userEmail) {
      setFormError("Both fields are required!");
      return;
  }

  try {
      const response = await axios.post("http://localhost:5215/api/events/register", {
          username: userName,
          eventId: event.id,
      });
      //localStorage.setItem("username", userName);

      if (response.data.success) {
          alert("Event registered successfully!");
          navigate("/cart"); // Redirect to cart page
      } else {
          setFormError(response.data.message);
      }
  } catch (error) {
      console.error("Error registering event:", error);
      setFormError("Failed to register event.");
  }
  };

  return (
    <div className="event-registration">

      <h1>Event Registration</h1>
      <h2>Register for: {event.name || "No Event Selected"}</h2>
      <p>Date: {event.date || "N/A"}</p>

      {formError && <p style={{ color: "red" }}>{formError}</p>} {/* Display form error */}
      <div className="eventreg_form">
      <form onSubmit={handleSubmit}>
        <label>
          Your Username:
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Your Email:
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <h2>We will Sent You an email to confirm your Registration for this event!!</h2>
        <button type="submit">Register</button>
      </form>
      </div>


    </div>
  );
}

export default EventRegistration;

