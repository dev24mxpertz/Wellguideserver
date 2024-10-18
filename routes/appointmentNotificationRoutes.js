const express = require('express');
const { sendAppointmentNotification } = require('../controllers/appointmentNotificationController');

const router = express.Router();

// POST route for sending appointment notifications to both user and dentist
router.post('/sendAppointmentNotification', sendAppointmentNotification);

module.exports = router;
