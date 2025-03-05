import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "./Cartpage.css";

function Cart() {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetchRegisteredEvents();
        }
    }, [username]); // Re-fetch when username changes

    const fetchRegisteredEvents = async () => {
        if (!username) {
            setError("User not logged in");
            return;
        }

        console.log("Fetching events for username:", username); // Log the username

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5215/api/events/cart/${username}`);
            console.log("Backend Response:", response.data); // Log the response
            if (response.data.success) {
                setRegisteredEvents(response.data.events);
            } else {
                setError("No registered events found.");
            }
        } catch (error) {
            console.error("Error fetching registered events:", error);
            setError("Error loading events.");
        }
        setLoading(false);
    };

    return (
        <div className="cart-page">
            <h1 className="cart-header">Your Registered Events</h1>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            {registeredEvents.length > 0 ? (
                <div className="eventcart-grid">
                    {registeredEvents.map((event) => (
                        <div className="event-card" key={event.id}>
                            <h3>{event.name}</h3>
                            <p className="event-date">
                                📅 {format(new Date(event.date), "yyyy-MM-dd")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-events-message">No events registered yet.</p>
            )}

            <button className="dashboard-button" onClick={() => navigate("/eventlist")}>
                ⬅ Return to Dashboard
            </button>
        </div>
    );
}

export default Cart;