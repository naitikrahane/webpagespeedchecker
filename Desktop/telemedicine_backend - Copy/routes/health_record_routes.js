// routes/health_record_routes.js
const express = require('express');
const router = express.Router();
const healthRecordController = require('../controllers/health_record_controller');
const authMiddleware = require('../middleware/auth_middleware');

router.post('/create', authMiddleware.verifyToken, healthRecordController.createHealthRecord);
router.get('/list', authMiddleware.verifyToken, healthRecordController.getHealthRecords);

module.exports = router;