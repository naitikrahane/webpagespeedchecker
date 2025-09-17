// controllers/emergency_controller.js
exports.triggerSOS = (req, res) => {
    // In a real app, this would trigger an SMS, email, or a notification
    // to emergency contacts or a call center.
    console.log(`EMERGENCY SOS REQUEST RECEIVED for user ID: ${req.userId}`);
    res.status(200).json({ message: 'Emergency SOS request sent successfully.' });
};