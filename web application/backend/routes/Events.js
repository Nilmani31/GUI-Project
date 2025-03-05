import express from 'express';
import cors from 'cors';
import { db } from '../index.js'; 

const router = express.Router();

router.use(cors()); 

// Get all events from the database
router.get('/', (req, res) => {
    const query = 'SELECT * FROM events';  // Query to fetch all events
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});

// Post a new event (example)
router.post('/', (req, res) => {
    const { name, date, description, venue, time, contact } = req.body;
    const query = 'INSERT INTO events (name, date, description, venue, time, contact) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, date, description, venue, time, contact], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.json({ message: 'Event added successfully!', id: result.insertId });
    });
});

// DELETE route for deleting an event

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // Parse the id as an integer
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID provided." });
        return;
    }

    const query = "DELETE FROM events WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting event:", err);
            res.status(500).json({ error: "Error deleting event." });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Event not found." });
            return;
        }
        res.status(200).json({ message: "Event deleted successfully." });
    });
});
// Get an event by ID
router.get('/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the URL
    const query = 'SELECT * FROM events WHERE id = ?'; // SQL query to fetch event by ID
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching event:', err);
            res.status(500).send('Error fetching event details.');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Event not found.'); // Handle case where no event matches the ID
            return;
        }
        res.json(results[0]); // Send the event data as JSON
    });
});
router.post("/register", async (req, res) => {
    const { username, eventId } = req.body;

    if (!username || !eventId) {
        return res.status(400).json({ success: false, message: "Username and Event ID are required" });
    }

    try {
        // Check if student exists
        const studentQuery = "SELECT username FROM students WHERE username = ?";
        const [studentResult] = await db.promise().query(studentQuery, [username]);

        if (studentResult.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Check if event exists
        const eventQuery = "SELECT id FROM events WHERE id = ?";
        const [eventResult] = await db.promise().query(eventQuery, [eventId]);

        if (eventResult.length === 0) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        // Check if the student is already registered for the event
        const checkQuery = "SELECT * FROM registrations WHERE username = ? AND event_id = ?";
        const [checkResult] = await db.promise().query(checkQuery, [username, eventId]);

        if (checkResult.length > 0) {
            return res.status(400).json({ success: false, message: "Already registered for this event" });
        }

        // Insert into registrations table
        const insertQuery = "INSERT INTO registrations (username, event_id) VALUES (?, ?)";
        await db.promise().query(insertQuery, [username, eventId]);

        res.json({ success: true, message: "Registration successful!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// Update an event by ID
router.put('/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the URL
    const { name, date, description, venue, time, contact } = req.body; // Get updated data from the request body

    const query = `
        UPDATE events 
        SET name = ?, date = ?, description = ?, venue = ?, time = ?, contact = ?
        WHERE id = ?
    `;

    db.query(query, [name, date, description, venue, time, contact, id], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            res.status(500).send('Error updating event.');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Event not found.'); // Handle case where no event matches the ID
            return;
        }
        res.json({ message: 'Event updated successfully!' }); // Send success response
    });
});

router.get("/cart/:username", async (req, res) => {
    const { username } = req.params; // Get username from the URL

    try {
        // Query to fetch events registered by the user
        const query = `
            SELECT e.id, e.name, e.date, e.venue, e.description, e.time, e.contact
            FROM events e
            JOIN registrations r ON e.id = r.event_id
            WHERE r.username = ?
        `;

        // Execute the query
        const [results] = await db.promise().query(query, [username]);
        console.log("Query Results:", results); // Log the results

        if (results.length > 0) {
            res.json({ success: true, events: results }); // Return registered events
        } else {
            res.status(404).json({ success: false, message: "No events registered yet." });
        }
    } catch (error) {
        console.error("Error fetching registered events:", error);
        res.status(500).json({ success: false, message: "Error fetching registered events." });
    }
});

export default router;

