// models/Appointment.js
const db = require('../config/db');

class Appointment {
    static async createAppointment(patientId, doctorId, appointmentDate, appointmentTime) {
        const [result] = await db.execute(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)',
            [patientId, doctorId, appointmentDate, appointmentTime]
        );
        return result.insertId;
    }

    static async findByUserId(userId, userType) {
        let query = '';
        let params = [userId];

        if (userType === 'patient') {
            query = 'SELECT a.*, u.name AS doctor_name, u.email AS doctor_email FROM appointments a JOIN users u ON a.doctor_id = u.id WHERE a.patient_id = ? ORDER BY a.appointment_date, a.appointment_time';
        } else if (userType === 'doctor') {
            query = 'SELECT a.*, u.name AS patient_name, u.email AS patient_email FROM appointments a JOIN users u ON a.patient_id = u.id WHERE a.doctor_id = ? ORDER BY a.appointment_date, a.appointment_time';
        }

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async updateStatus(appointmentId, status) {
        const [result] = await db.execute(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, appointmentId]
        );
        return result.affectedRows;
    }
}

module.exports = Appointment;