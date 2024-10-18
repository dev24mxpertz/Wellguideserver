const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const appointmentNotificationRoutes = require('./routes/appointmentNotificationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { appointmentOneDayAgoReminderNotifications,appointmentSameDayReminderNotifications,appointmentThirtyMinutesReminderNotifications,appointmentUnattendedReminderNotifications } = require('./controllers/notificationRemainderController');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path as needed
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email routes
app.use('/api', emailRoutes);


// Routes
app.use('/notifications', notificationRoutes); // All notification-related routes

app.get('/api/appointments/count', async (req, res) => {
  try {
    const appointmentSnapshot = await db.collection('Appointments').get();
    const count = appointmentSnapshot.size; // Get the number of documents
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching appointments count:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Use the appointment notification routes
app.use('/api', appointmentNotificationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Schedule daily reminders (if needed)
// Uncomment the following lines if you want to run the reminders automatically
const cron = require('node-cron');
cron.schedule('0 8 * * *', async () => {
  console.log('Running daily appointment reminder check at 8 AM');
  await appointmentOneDayAgoReminderNotifications();
});
cron.schedule('0 18 * * *', async () => {
  console.log('Running daily appointment reminder check at 6 PM');
  await appointmentOneDayAgoReminderNotifications();
});
cron.schedule('0 8 * * *', async () => {
  console.log('Running same-day appointment reminder check at 8 AM');
  await appointmentSameDayReminderNotifications();
});
cron.schedule('*/30 * * * *', async () => {
  console.log('Running 30-35 minute appointment reminder check');
  await appointmentThirtyMinutesReminderNotifications();
});
// appointmentThirtyMinutesReminderNotifications()
// appointmentUnattendedReminderNotifications();
cron.schedule('0,4,34 * * * *', async () => {
  console.log('Running unattended appointment reminder check');
  await appointmentUnattendedReminderNotifications();
});
// appointmentUnattendedReminderNotifications();
// Run every minute for testing purposes
// cron.schedule('* * * * *', async () => {
//   console.log('Running appointment reminder check every minute for testing');
//   await appointmentOneDayAgoReminderNotifications();
// });



// sendEmail.js

// const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key directly in the code
// sgMail.setApiKey('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');

// // Function to send an email
// const sendEmail = async () => {
//     const msg = {
//         to: 'dev9.mxpertz@gmail.com', // Change to your recipient
//         from: 'dev9.mxpertz@gmail.com', // Change to your verified sender
//         subject: 'Test Email from SendGrid',
//         text: 'Hello, this is a test email sent using SendGrid!',
//         html: '<strong>Hello, this is a test email sent using SendGrid!</strong>',
//     };

//     try {
//         const response = await sgMail.send(msg);
//         console.log('Email sent successfully:', response);
//     } catch (error) {
//         console.error('Error sending email:', error.response.body);
//     }
// };
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')
// const msg = {
//   to: 'dev15.mxpertz@gmail.com', // Change to your recipient
//         from: 'dev9.mxpertz@gmail.com', // Change to your verified sender
//         subject: 'Test Email from SendGrid',
//         text: 'Hello, this is a test email sent using SendGrid!',
//         html: '<strong>Hello, this is a test email sent using SendGrid!</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// // Call the sendEmail function
// // sendEmail();
