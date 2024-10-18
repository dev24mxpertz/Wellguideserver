// emailController.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  // key: '2d8b2c7411e36ceda93c1b8d63679768-1b5736a5-90d5ddb4',
  key:'e92bf187c1609aaa6e41c2fa87eb6a4a-d010bdaf-8361dd2b',//Sandbox key
  url: 'https://api.mailgun.net' // Add the EU endpoint if needed
});

// mg.messages.create('www.wellgide.com', {
//   from: "Excited User <mailgun@www.wellgide.com>",
//   to: ["dev15.mxpertz@gmail.com"],
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
//   html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
// .then(msg => console.log(msg)) // logs response data
// .catch(err => console.log(err)); // logs any error

// mg.messages.create('sandbox-123.mailgun.org', {
//   from: "Excited User <mailgun@sandboxf96cfb95bc024f4589e9a6717d1c2c80.mailgun.org>",
//   to: ["dev15.mxpertz@gmail.com"],
//   subject: "Hello",
//   text: "Testing some Mailgun awesomeness!",
//   html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
// .then(msg => console.log(msg)) // logs response data
// .catch(err => console.log(err)); 








exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const response = await mg.messages.create('wellgide.com', {
      from: "Support <support@wellgide.com>",
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    res.status(200).json({ message: 'Email sent successfully!', data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// // require('dotenv').config(); // Load environment variables

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: 'api',
//   key: process.env.MAILGUN_API_KEY || '2d8b2c7411e36ceda93c1b8d63679768-1b5736a5-90d5ddb4' // Use environment variable for security
// });

const sendEmail = async () => {
  try {
    const response = await mg.messages.create('www.wellgide.com', {
      from: "Excited User <mailgun@www.wellgide.com>",
      to: ["dev15.mxpertz@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>"
    });

    console.log('Email sent successfully:', response); // logs response data
  } catch (error) {
    console.error('Error sending email:', error); // logs any error
  }
};

// Call the sendEmail function
// sendEmail();
// const formData = require('form-data');
//   const Mailgun = require('mailgun.js');
  // const mailgun = new Mailgun(formData);
  // const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});
  
