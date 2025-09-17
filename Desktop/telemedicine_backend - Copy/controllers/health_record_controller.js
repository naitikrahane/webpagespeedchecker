// controllers/health_record_controller.js
const HealthRecord = require('../models/HealthRecord');

exports.createHealthRecord = async (req, res) => {
    const { symptoms, diagnosis, prescription } = req.body;
    const userId = req.userId;

    try {
        await HealthRecord.createRecord(userId, symptoms, diagnosis, prescription);
        res.status(201).json({ message: 'Health record created successfully!' });
    } catch (error) {
        console.error('Error creating health record:', error);
        res.status(500).json({ message: 'Error creating health record.' });
    }
};

exports.getHealthRecords = async (req, res) => {
    const userId = req.userId;

    try {
        const records = await HealthRecord.getRecords(userId);
        res.status(200).json({ records });
    } catch (error) {
        console.error('Error fetching health records:', error);
        res.status(500).json({ message: 'Error fetching health records.' });
    }
};