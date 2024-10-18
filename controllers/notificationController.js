const admin = require('firebase-admin');

// Function to send notifications
const sendNotification = async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body
    },
    token: token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(`Notification sent: ${response}`);
    res.status(200).send({ success: true, messageId: response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  sendNotification
};
