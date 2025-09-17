// config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '0q8-av.h.filess.io',
    user: 'telemedicine_milktoward',
    password: '71bde1292d111b4879deeddfa1a161e9dd5c4c4d',
    database: 'telemedicine_milktoward',
    port: 3307, // Use the specific port provided
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;