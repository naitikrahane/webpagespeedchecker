// routes/appointment_routes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment_controller');
const authMiddleware = require('../middleware/auth_middleware');

// All appointment routes are protected
router.post('/create', authMiddleware.verifyToken, appointmentController.createAppointment);
router.get('/list', authMiddleware.verifyToken, appointmentController.getAppointments);
router.post('/cancel', authMiddleware.verifyToken, appointmentController.cancelAppointment);

module.exports = router; // <-- This line is essential