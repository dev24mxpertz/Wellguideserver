const twilio = require('twilio');

class AppointmentSMS {
  constructor(client, twilioPhoneNumber) {
    this.client = client; // Twilio client
    this.twilioPhoneNumber = twilioPhoneNumber; // Twilio phone number
  }

  // Function to send Registration Completion SMS
  async sendRegistrationCompletion(phoneNumber, patientName) {
    const message = `Dear ${patientName}, welcome to Wellgide, your oral care app.`;
    await this._sendSms(phoneNumber, message);
  }

  // Function to send Appointment Booking Confirmation SMS
  async sendAppointmentBookingConfirmation(phoneNumber, patientName, doctorName, dateTime) {
    const message = `Dear ${patientName}, you have an appointment with ${doctorName} on ${dateTime}. Download the Wellgide app for the best appointment experience.`;
    await this._sendSms(phoneNumber, message);
  }

  // Function to send Appointment Reminder SMS
  async sendAppointmentReminder(phoneNumber, patientName, doctorName, dateTime) {
    const message = `Dear ${patientName}, this is a reminder for your appointment with ${doctorName} on ${dateTime}. Download the Wellgide app for the best appointment experience.`;
    await this._sendSms(phoneNumber, message);
  }

  // Function to send Post Appointment SMS
  async sendPostAppointment(phoneNumber, patientName, reviewPageLink) {
    const message = `Dear ${patientName}, your consultation is complete. Please check your account for consultation notes. Tell us about your experience: ${reviewPageLink}`;
    await this._sendSms(phoneNumber, message);
  }

  // Function to send Appointment Cancellation SMS
  async sendAppointmentCancellation(phoneNumber, patientName, doctorName, dateTime) {
    const message = `Dear ${patientName}, your appointment with ${doctorName} on ${dateTime} has been cancelled. Please use the Wellgide app to book a new appointment.`;
    await this._sendSms(phoneNumber, message);
  }

  // Private function to send SMS using Twilio
  async _sendSms(phoneNumber, message) {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: this.twilioPhoneNumber, // Twilio phone number
        to: phoneNumber, // Recipient's phone number
      });
      console.log('SMS sent successfully:', response.sid);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
}

module.exports = AppointmentSMS;
