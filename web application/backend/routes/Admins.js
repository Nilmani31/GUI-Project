
import express from "express";
import { db } from "../index.js"; // Ensure you have the database connection here
import bcrypt from "bcrypt"; // Install this with `npm install bcrypt`

const router = express.Router();

// Admin login route
router.post("/login", (req, res) => {
  console.error(req.body)
  const { username, password } = req.body;
  console.error("username: ", username);
  console.error("password: ", password);

  // Check if admin exists in the database
  const query = "SELECT * FROM admin WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error checking admin:", err);
      return res.status(500).json({ error: "Server error." });
    }

    // If admin not found
    if (results.length === 0) {
      return res.status(404).json({ error: "Admin not found !!!." });
    }

    const admin = results[0];

    // Compare the provided password with the stored one
    

        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) {
              console.error("Error comparing passwords:", err);
              return res.status(500).json({ error: "Server error." });
          }
      
          console.log("Password entered:", password); // Add this
          console.log("Password in database:", admin.password); // Add this
      
          if (!isMatch) {
              console.log("Password does not match!");
              return res.status(401).json({ error: "Invalid password." });
          }
      
          console.log("Login successful!");
          return res.status(200).json({
              message: "Login successful!",
              admin: {
                  username: admin.username,
                  email: admin.email,
              },
          });

      // Successful login
      
    });
  });
});

export default router;