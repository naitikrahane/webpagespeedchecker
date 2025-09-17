// routes/video_routes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video_controller');
const authMiddleware = require('../middleware/auth_middleware');

// Route to generate a video call token
router.post('/token', authMiddleware.verifyToken, videoController.generateRtcToken);

module.exports = router;