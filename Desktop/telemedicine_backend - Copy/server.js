// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Import database connection from the config folder
const db = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth_routes');
const appointmentRoutes = require('./routes/appointment_routes');
const videoRoutes = require('./routes/video_routes');
const doctorRoutes = require('./routes/doctor_routes');
const emergencyRoutes = require('./routes/emergency_routes');
const healthRecordRoutes = require('./routes/health_record_routes'); // <-- Crucial line

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/healthrecords', healthRecordRoutes); // <-- Crucial line

// Test database connection when the server starts
db.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL database!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
    });

// A simple test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Telemedicine Backend API is running!');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Backend server is running on http://localhost:${port}`);
});