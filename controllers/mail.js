const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'no-reply@wellgide.com', // Your Gmail address
    pass: 'pyanxpsoqfwgwnzh', // Your App Password
  },
});

// Email options
const mailOptions = {
  from: 'no-reply@wellgide.com', // Sender's email address
  to: 'dev15.mxpertz@gmail.com',    // Recipient's email address
  subject: 'Test Email',          // Email subject
  text: 'Hello! This is a test email sent from Node.js using Gmail SMTP.', // Email body text
  html:  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; background-color: #fff;">
    <div style="text-align: center; padding-bottom: 20px;">
      <img src="https://www.wellgide.com/logo.png" alt="WellGide" style="width: 100px;" />
    </div>
    <h2 style="text-align: center; color: #333;">Payment Failed</h2>
    <p>Hi Nelnish,</p>
    <p>Unfortunately, your payment for the appointment with Dr. Sonia Hall was unsuccessful. Please check your payment method and try again.</p>
    <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #555;">Summary</h3>
      <p><strong>Service:</strong> Dental Consultation</p>
      <p><strong>Date:</strong> 17/09/2024</p>
      <p><strong>Cancelled Date:</strong> 18/09/2024</p>
      <p><strong>Time:</strong> 11:00 AM</p>
      <p><strong>Location:</strong> Virtual Consultation</p>
      <p><strong>Amount:</strong> £20</p>
    </div>
    <p>If you continue to experience issues, please contact our support team.</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://www.wellgide.com/retry" style="padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Retry</a>
    </div>
    <p style="margin-top: 40px;">We look forward to seeing you!</p>
    <p style="color: #333;"><strong>WELLGIDE</strong></p>
    <footer style="margin-top: 40px; text-align: center; color: #777;">
      <p>+44 7956 150 162 | <a href="https://www.wellgide.com" style="color: #555; text-decoration: none;">www.wellgide.com</a></p>
    </footer>
  </div>
  ` // If you want to send HTML
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred:', error);
  }
  console.log('Email sent:', info.response);
});
