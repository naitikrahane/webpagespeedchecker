// models/HealthRecord.js
const db = require('../config/db');

class HealthRecord {
    static async createRecord(userId, symptoms, diagnosis, prescription) {
        const [result] = await db.execute(
            'INSERT INTO health_records (user_id, symptoms, diagnosis, prescription) VALUES (?, ?, ?, ?)',
            [userId, symptoms, diagnosis, prescription]
        );
        return result.insertId;
    }

    static async getRecords(userId) {
        const [rows] = await db.execute(
            'SELECT * FROM health_records WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }
}

module.exports = HealthRecord;