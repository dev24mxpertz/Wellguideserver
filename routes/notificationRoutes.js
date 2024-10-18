const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// POST endpoint to send notification
router.post('/send', notificationController.sendNotification);

module.exports = router;
