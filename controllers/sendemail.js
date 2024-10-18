// // sendEmail.js

// require('dotenv').config(); // Load environment variables from .env file
// const sgMail = require('@sendgrid/mail');

// // Set the API key from the environment variable
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Function to send an email
// const sendEmail = async () => {
//     const msg = {
//         to: 'recipient@example.com', // Change to your recipient
//         from: 'sender@example.com', // Change to your verified sender
//         subject: 'Test Email from SendGrid',
//         text: 'Hello, this is a test email sent using SendGrid!',
//         html: '<strong>Hello, this is a test email sent using SendGrid!</strong>',
//     };

//     try {
//         const response = await sgMail.send(msg);
//         console.log('Email sent successfully:', response);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// sendEmail();
