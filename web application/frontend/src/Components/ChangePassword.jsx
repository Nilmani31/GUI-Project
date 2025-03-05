import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Simple validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }
    


      try {
        const response = await axios.put("http://localhost:5215/api/students/change-password", {
          username,
          currentPassword,
          newPassword,
        });
  
        if (response.data.success) {
          setSuccessMessage("Password changed successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setUsername("");
          navigate("/eventlist");

        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setErrorMessage("Error updating password. Please try again.");
      }
  };

  return (
    <div className="change-password-container">
      <div className="form-container">
        <h2>Change Password</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      </div>
      <div className="image-container">
        <img
          src="password_background.avif"
          alt="Password Security"
          className="pass-img"
        />
      </div>
    </div>
  );
};

export default ChangePassword;

