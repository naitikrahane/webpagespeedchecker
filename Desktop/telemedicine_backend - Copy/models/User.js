// models/User.js
const db = require('../config/db');

class User {
    static async createUser(name, email, password, userType) {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
            [name, email, password, userType]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT id, name, email, user_type FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // New function to find all doctors
    static async findDoctors() {
        const [rows] = await db.execute('SELECT id, name, email FROM users WHERE user_type = "doctor"');
        return rows;
    }
}

module.exports = User;