// controllers/appointment_controller.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.createAppointment = async (req, res) => {
    const { doctorId, appointmentDate, appointmentTime } = req.body;
    const patientId = req.userId;

    try {
        const appointmentId = await Appointment.createAppointment(patientId, doctorId, appointmentDate, appointmentTime);
        res.status(201).json({ message: 'Appointment created successfully!', appointmentId });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment.' });
    }
};

exports.getAppointments = async (req, res) => {
    const userId = req.userId;
    const userType = req.userType; // <-- This is now available

    try {
        const appointments = await Appointment.findByUserId(userId, userType);
        res.status(200).json({ appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments.' });
    }
};

exports.cancelAppointment = async (req, res) => {
    const { appointmentId } = req.body;
    
    try {
        await Appointment.updateStatus(appointmentId, 'canceled');
        res.status(200).json({ message: 'Appointment canceled successfully.' });
    } catch (error) {
        console.error('Error canceling appointment:', error);
        res.status(500).json({ message: 'Error canceling appointment.' });
    }
};