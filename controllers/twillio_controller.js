const twilio = require('twilio');
const AppointmentSMS = require('./appointmentSMS'); 
// Replace with your Twilio credentials
const accountSid = 'AC103023f39a6b3c9b73cfd21030453bbf';
const authToken = '4806ed204c91a063e624508ec6baa719';
const twilioPhoneNumber = '+447447676708';

// Initialize Twilio client
const client = new twilio(accountSid, authToken);
const smsSender = new AppointmentSMS(client, '+447447676708');

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

// (async () => {
//   // Send registration completion SMS
//   await smsSender.sendRegistrationCompletion('+447956150162', 'John Doe'); // phone number, patient name

//   // Send appointment booking confirmation SMS
//   await smsSender.sendAppointmentBookingConfirmation('+447956150162', 'John Doe', 'Dr. Smith', '2024-10-20 10:00 AM'); // phone number, patient name, doctor name, appointment date/time

//   // Send appointment reminder SMS
//   await smsSender.sendAppointmentReminder('+447956150162', 'John Doe', 'Dr. Smith', '2024-10-20 10:00 AM'); // phone number, patient name, doctor name, appointment date/time

//   // Send post-appointment SMS
//   await smsSender.sendPostAppointment('+447956150162', 'John Doe', 'http://review.link'); // phone number, patient name, review link

//   // Send appointment cancellation SMS
//   await smsSender.sendAppointmentCancellation('+447956150162', 'John Doe', 'Dr. Smith', '2024-10-20 10:00 AM'); // phone number, patient name, doctor name, appointment date/time
// })();
// Example usage:
// await sendSms('+44 7956 150162', 'This is for test. \nYour appointment is scheduled for tomorrow.');
