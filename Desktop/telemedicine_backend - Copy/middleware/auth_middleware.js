// middleware/auth_middleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    try {
        const bearerToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        const decoded = jwt.verify(bearerToken, jwtConfig.secret);
        req.userId = decoded.id; // This line is crucial
        req.userType = decoded.userType; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
};