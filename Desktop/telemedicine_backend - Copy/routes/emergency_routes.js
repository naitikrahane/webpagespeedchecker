// routes/emergency_routes.js
const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergency_controller'); // <-- Check this line
const authMiddleware = require('../middleware/auth_middleware');

router.post('/sos', authMiddleware.verifyToken, emergencyController.triggerSOS);

module.exports = router;