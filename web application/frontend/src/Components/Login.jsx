import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(""); // State for error message



  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const response = await fetch("http://localhost:5215/api/students/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("username", username);
          console.log("Student details:", data.students);
          navigate("/eventlist")
        } else {
          alert("Login failed");
        }



       } catch (error) {
        console.error("Error logging in:", error);
        setError("0: An unexpected error occurred.");
       }
  };

  const goToAdmindash = () => {
    navigate("/admin" );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
             required
          />
          <br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br/>
          <button className="studentloginbutton">Login</button>
          <br/>
          
          <br/>
        </form>
        <button  className ="adminlogbutton" onClick={goToAdmindash}>Login As Admin</button>
        <p>Don't have an account? <Link to="/AddStudent">Sign Up</Link></p>
        
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
        
      </div>
    </div>
  );
};

export default Login;
