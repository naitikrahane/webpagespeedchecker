// controllers/video_controller.js
const { RtcTokenBuilder, RtcRole } = require('agora-token');
const agoraConfig = require('../config/agora_config');

exports.generateRtcToken = (req, res) => {
    const { channelName } = req.body;
    const uid = req.userId.toString(); // <-- The fix is here: convert userId to a string
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600; // 1 hour

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Use the string uid in the builder function
    const token = RtcTokenBuilder.buildTokenWithUid(
        agoraConfig.appId,
        agoraConfig.appCertificate,
        channelName,
        uid,
        role,
        privilegeExpiredTs
    );

    res.status(200).json({ token: token, uid: uid });
};