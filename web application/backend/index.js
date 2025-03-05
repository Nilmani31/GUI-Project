
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';  
import eventsRouter from './routes/Events.js';
import studentsRouter from './routes/Students.js';
import adminsRouter from './routes/Admins.js';

const app = express();

// Enable CORS to allow frontend (running on different port) to access this backend
app.use(cors());  

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Create MySQL connection
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chamsha@31#',
    database: 'event_registration',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

// Simple health check route to ensure server is working
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use the routes for handling events, students, and admins
app.use('/api/events', eventsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/admins", adminsRouter);

const PORT = 5215;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});