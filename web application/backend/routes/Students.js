import express from "express";
import { db } from "../index.js"; 
import bcrypt from "bcrypt"; 

const router = express.Router();
router.get('/', (req, res) => {
    const query = 'SELECT * FROM students'; // Query to fetch all events
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});

// Admin login route
router.post("/login", (req, res) => {
  console.error(req.body)
  const { username, password } = req.body;
  console.error("Student-username: ", username);
  console.error("Student-password: ", password);

  // Check if admin exists in the database
  const query = "SELECT * FROM students WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error checking students:", err);
      return res.status(500).json({ error: "Server error." });
    }

    // If admin not found
    if (results.length === 0) {
      return res.status(404).json({ error: "student not found !!!." });
    }

    const students = results[0];

    // Compare the provided password with the stored one
    

        bcrypt.compare(password, students.password, (err, isMatch) => {
          if (err) {
              console.error("Error comparing passwords:", err);
              return res.status(500).json({ error: "Server error." });
          }
      
          console.log("Password entered:", password); 
          console.log("Password in database:", students.password); 
      
          if (!isMatch) {
              console.log("Password does not match!");
              return res.status(401).json({ error: "Invalid password." });
          }
      
          console.log("Login successful!");
          return res.status(200).json({
              message: "Login successful!",
              students: {
                  username: students.username,
                  email: students.email,
              },
          });
      
      
 


    });
  });
});

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO students (username, password, email) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Error inserting data" });
      }
      res.json({ message: "Student successfully added!", id: result.insertId });
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/change-password", async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  // Check if student exists
  const sql = "SELECT password FROM students WHERE username = ?";
  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const storedPassword = result[0].password;

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, storedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    const updateSql = "UPDATE students SET password = ? WHERE username = ?";
    db.query(updateSql, [hashedPassword, username], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error updating password" });
      }
      res.json({ success: true, message: "Password changed successfully" });
    });
  });
});


export default router;










