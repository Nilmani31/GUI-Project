import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5215/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("Admin details:", data.admin);
        navigate("/admin-dashboard");
        // Redirect to the dashboard or another page here
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred.");
    }
  };
  
  const goToDashbord = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="AdminLogin-container">
      
      <div className="AdminForm">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      </div>
     
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </div>
    
  );
  
};

export default AdminLogin;
