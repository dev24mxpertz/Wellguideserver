// const nodemailer = require('nodemailer');

// // Create a transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'no-reply@wellgide.com', // Your Gmail address
//     pass: 'pyanxpsoqfwgwnzh', // Your App Password
//   },
// });

// // Email options
// const mailOptions = {
//   from: 'no-reply@wellgide.com', // Sender's email address
//   to: 'dev15.mxpertz@gmail.com',    // Recipient's email address
//   subject: 'Test Email',          // Email subject
//   text: 'Hello! This is a test email sent from Node.js using Gmail SMTP.', // Email body text
//   html: `
//   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: none;">
//     <!-- Header Section with Logo and Background -->
//     <div style="background-color: #E8E790; padding: 40px 0; text-align: center;">
//       <img src="https://your-logo-link.png" alt="WellGide Logo" style="width: 80px; margin-bottom: 20px;">
//     </div>

//     <!-- Main Content Section -->
//     <div style="background-color: #ffffff; padding: 30px; color: #333333;">
//       <h2 style="color: #000000; text-align: center; font-size: 24px; font-weight: 600;">Payment Failed</h2>
//       <p>Hi Nelnish,</p>
//       <p>Unfortunately, your payment for the appointment with Dr. Sonia Hall was unsuccessful. Please check your payment method and try again.</p>

//       <!-- Summary Section -->
//       <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin-top: 20px;">
//         <h3 style="margin-top: 0; color: #333333; font-weight: bold;">Summary</h3>
//         <p><strong>Service:</strong> Dental Consultation</p>
//         <p><strong>Date:</strong> 17/09/2024</p>
//         <p><strong>Cancelled Date:</strong> 18/09/2024</p>
//         <p><strong>Time:</strong> 11:00 AM</p>
//         <p><strong>Location:</strong> Virtual Consultation</p>
//         <p><strong>Amount:</strong> £20</p>
//       </div>

//       <!-- Retry Button -->
//       <div style="text-align: center; margin-top: 30px;">
//         <a href="https://www.wellgide.com/retry" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Retry</a>
//       </div>

//       <p style="margin-top: 30px;">If you continue to experience issues, please contact our support team.</p>
//       <p>We look forward to seeing you!</p>
//       <p style="font-weight: bold; margin-top: 40px;">WELLGIDE</p>
//     </div>

//     <!-- Footer Section -->
//     <div style="background-color: #002233; color: #ffffff; text-align: center; padding: 20px;">
//       <p style="margin: 0;">+44 7956 150 162 | <a href="https://www.wellgide.com" style="color: #ffffff; text-decoration: none;">www.wellgide.com</a></p>
//     </div>
//   </div>
//   `
// };

// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log('Error occurred:', error);
//   }
//   console.log('Email sent:', info.response);
// });
const twilio = require('twilio');

// Replace with your Twilio credentials
const accountSid = 'AC103023f39a6b3c9b73cfd21030453bbf';
const authToken = '4806ed204c91a063e624508ec6baa719';
const twilioPhoneNumber = '+447447676708';

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

// Function to send SMS using Twilio
async function sendSms(phoneNumber, message) {
  try {
    const response = await client.messages.create({
      body: message, // SMS content
      from: twilioPhoneNumber, // Your Twilio phone number
      to: phoneNumber, // Recipient's phone number
    });
    console.log('SMS sent successfully:', response.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}

// Example usage:
//  sendSms('+447956150162', 'This is for test. \nYour appointment is scheduled for tomorrow.');
