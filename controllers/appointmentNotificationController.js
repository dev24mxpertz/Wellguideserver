const admin = require('firebase-admin');

// Function to send appointment notifications to both user and dentist
const sendAppointmentNotification = async (req, res) => {
  const { userToken, dentistToken, userTitle, userBody, dentistTitle, dentistBody } = req.body;

  // Define messages for user and dentist
  const userMessage = {
    notification: {
      title: userTitle,
      body: userBody
    },
    token: userToken
  };

  const dentistMessage = {
    notification: {
      title: dentistTitle,
      body: dentistBody
    },
    token: dentistToken
  };

  try {
    // Send notification to the user
    const userResponse = await admin.messaging().send(userMessage);
    console.log(`Notification sent to user: ${userResponse}`);

    // Send notification to the dentist
    const dentistResponse = await admin.messaging().send(dentistMessage);
    console.log(`Notification sent to dentist: ${dentistResponse}`);

    // Send success response after both notifications are sent
    res.status(200).send({
      success: true,
      userNotificationId: userResponse,
      dentistNotificationId: dentistResponse
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  sendAppointmentNotification
};
