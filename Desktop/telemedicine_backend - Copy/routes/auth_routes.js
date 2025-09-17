// routes/auth_routes.js
const express = require('express');
const router = express.Router();
// Correctly import the controller and middleware files
const authController = require('../controllers/auth_controller'); 
const authMiddleware = require('../middleware/auth_middleware');

// Public routes for user authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected route (requires a valid JWT token)
router.get('/profile', authMiddleware.verifyToken, authController.getUserProfile);

module.exports = router;