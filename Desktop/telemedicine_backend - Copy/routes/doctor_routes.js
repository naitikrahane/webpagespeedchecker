// routes/doctor_routes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor_controller');
const authMiddleware = require('../middleware/auth_middleware');

// Route to get a list of all doctors. Protected to ensure only logged-in users can access.
router.get('/list', authMiddleware.verifyToken, doctorController.getDoctorList);

module.exports = router;