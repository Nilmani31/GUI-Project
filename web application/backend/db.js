const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chamsha@31#", // Replace with your MySQL password
  database: "event_registration", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  }
  console.log("Connected to the database!");
});

module.exports = db;
