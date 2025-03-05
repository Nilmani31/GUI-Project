import bcrypt from "bcrypt"; // Install this with `npm install bcrypt`
import { db } from "./index.js"; // Import the database connection (adjust the path if needed)

// List of admin usernames and their current plain-text passwords
const admins = [
  { username: "admin1", password: "123" },
  { username: "admin2", password: "125" },
];

// Hash each password and update the database
admins.forEach((admin) => {
  bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(`Error hashing password for ${admin.username}:`, err);
      return;
    }

    const query = "UPDATE admin SET password = ? WHERE username = ?";
    db.query(query, [hashedPassword, admin.username], (err, result) => {
      if (err) {
        console.error(`Error updating password for ${admin.username}:`, err);
      } else {
        console.log(`Password updated successfully for ${admin.username}`);
      }
    });
  });
});
const students = [
  { username: "eg245215", password: "Chamsha@31#" },
  
];

// Hash each password and update the database
students.forEach((student) => {
  bcrypt.hash(student.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(`Error hashing password for ${student.username}:`, err);
      return;
    }

    const query = "UPDATE students SET password = ? WHERE username = ?";
    db.query(query, [hashedPassword, student.username], (err, result) => {
      if (err) {
        console.error(`Error updating password for ${student.username}:`, err);
      } else {
        console.log(`Password updated successfully for ${student.username}`);
      }
    });
  });
});
