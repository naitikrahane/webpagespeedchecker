// controllers/doctor_controller.js
const User = require('../models/User');

exports.getDoctorList = async (req, res) => {
    try {
        const doctors = await User.findDoctors();
        res.status(200).json({ doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors.' });
    }
};