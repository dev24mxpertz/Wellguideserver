const admin = require('firebase-admin');
const moment = require('moment');

// Function to send notifications (FCM or other notification method)
async function sendNotification(token, title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
const appointmentSameDayReminderNotifications = async () => {
  try {
    const today = moment().format('DD-MM-YYYY');
    console.log(`Checking for appointments on ${today} for same-day reminder`);

    const appointmentSnapshot = await admin.firestore()
      .collection('Appointments')
      .where('date', '==', today)
      .get();

    if (appointmentSnapshot.empty) {
      console.log('No appointments for today.');
      return;
    }

    console.log(`Found ${appointmentSnapshot.docs.length} appointment(s) for today.`);

    for (const doc of appointmentSnapshot.docs) {
      const appointmentData = doc.data();
      console.log('Processing appointment:', appointmentData);

      const userId = appointmentData.userId;
      const dentistId = appointmentData.dentistId;

      const userSnapshot = await admin.firestore().collection('Users').doc(userId).get();
      const userFcmToken = userSnapshot.exists ? userSnapshot.data().fcmToken : null;
      console.log(`User FCM token: ${userFcmToken}`);

      const dentistSnapshot = await admin.firestore().collection('Users').doc(dentistId).get();
      const dentistFcmToken = dentistSnapshot.exists ? dentistSnapshot.data().fcmToken : null;
      console.log(`Dentist FCM token: ${dentistFcmToken}`);

      if (userFcmToken) {
        const userMessage = `Reminder: Your appointment with ${appointmentData.dentistName} is scheduled today at ${appointmentData.time}.`;
        console.log(`Sending notification to user: ${userMessage}`);
        await sendNotification(userFcmToken, 'Appointment Reminder', userMessage);
      }
      if (dentistFcmToken) {
        const dentistMessage = `Reminder: You have an appointment with ${appointmentData.userName} today at ${appointmentData.time}.`;
        console.log(`Sending notification to dentist: ${dentistMessage}`);
        await sendNotification(dentistFcmToken, 'Appointment Reminder', dentistMessage);
      }
    }
  } catch (error) {
    console.error('Error in appointmentSameDayReminderNotifications:', error);
  }
};

const appointmentOneDayAgoReminderNotifications = async () => {
  try {
    const today = moment();
    const tomorrow = today.add(1, 'days').format('DD-MM-YYYY');
    
    console.log('Tomorrow\'s date:', tomorrow);

    const appointmentSnapshot = await admin.firestore()
      .collection('Appointments')
      .where('date', '==', tomorrow)
      .get();

    if (appointmentSnapshot.empty) {
      console.log('No appointments for tomorrow.');
      return;
    }

    console.log('Found appointments:', appointmentSnapshot.size);

    for (const doc of appointmentSnapshot.docs) {
      const appointmentData = doc.data();
      console.log('Appointment Data:', appointmentData);

      const userId = appointmentData.userId;
      const dentistId = appointmentData.dentistId;

      const userSnapshot = await admin.firestore().collection('Users').doc(userId).get();
      console.log('User Snapshot exists:', userSnapshot.exists);

      const userFcmToken = userSnapshot.exists ? userSnapshot.data().fcmToken : null;
      console.log('User FCM Token:', userFcmToken);

      const dentistSnapshot = await admin.firestore().collection('Users').doc(dentistId).get();
      console.log('Dentist Snapshot exists:', dentistSnapshot.exists);

      const dentistFcmToken = dentistSnapshot.exists ? dentistSnapshot.data().fcmToken : null;
      console.log('Dentist FCM Token:', dentistFcmToken);

      if (userFcmToken) {
        console.log('Sending notification to user:', userFcmToken);
        await sendNotification(userFcmToken, 'Appointment Reminder', `Your appointment with ${appointmentData.dentistName} is scheduled for tomorrow at ${appointmentData.time}.`);
      }
      if (dentistFcmToken) {
        console.log('Sending notification to dentist:', dentistFcmToken);
        await sendNotification(dentistFcmToken, 'Appointment Reminder', `You have an appointment with ${appointmentData.userName} tomorrow at ${appointmentData.time}.`);
      }
    }
  } catch (error) {
    console.error('Error in appointmentOneDayAgoReminderNotifications:', error);
  }
};
const appointmentThirtyMinutesReminderNotifications = async () => {
  try {
    const currentTime = moment();
    const minTargetTime = currentTime.clone().add(30, 'minutes').format('hh:mm A'); // 30 mins from now
    const maxTargetTime = currentTime.clone().add(35, 'minutes').format('hh:mm A'); // 35 mins total
    const todayDate = currentTime.format('DD-MM-YYYY');

    console.log(`Checking for appointments between ${minTargetTime} and ${maxTargetTime} on ${todayDate}`);

    const appointmentSnapshot = await admin.firestore()
      .collection('Appointments')
      .where('date', '==', todayDate)
      .get();

    if (appointmentSnapshot.empty) {
      console.log(`No appointments for today.`);
      return;
    }

    console.log(`Found ${appointmentSnapshot.docs.length} appointments for today`);

    for (const doc of appointmentSnapshot.docs) {
      const appointmentData = doc.data();
      const appointmentTime = moment(appointmentData.time, 'hh:mm A'); // Parse time string
      console.log(`Processing appointment for ${appointmentData.userName} at ${appointmentData.time}`);

      // Check if appointment time is between 30 to 35 minutes from now
      if (appointmentTime.isBetween(currentTime.clone().add(30, 'minutes'), currentTime.clone().add(35, 'minutes'))) {
        console.log(`Sending reminder for appointment at ${appointmentData.time} with Dr. ${appointmentData.dentistName}`);

        // Fetch user data
        const userSnapshot = await admin.firestore().collection('Users').doc(appointmentData.userId).get();
        const userFcmToken = userSnapshot.exists ? userSnapshot.data().fcmToken : null;
        console.log(`User FCM token: ${userFcmToken}`);

        // Fetch dentist data
        const dentistSnapshot = await admin.firestore().collection('Users').doc(appointmentData.dentistId).get();
        const dentistFcmToken = dentistSnapshot.exists ? dentistSnapshot.data().fcmToken : null;
        console.log(`Dentist FCM token: ${dentistFcmToken}`);

        // Send reminders
        if (userFcmToken) {
          console.log(`Sending notification to user: ${appointmentData.userName}`);
          await sendNotification(userFcmToken, 'Appointment Reminder', `Your appointment with ${appointmentData.dentistName} is in 30 minutes at ${appointmentData.time}.`);
          console.log(`Notification sent to user: ${appointmentData.userName}`);
        } else {
          console.log(`No FCM token found for user: ${appointmentData.userName}`);
        }

        if (dentistFcmToken) {
          console.log(`Sending notification to dentist: ${appointmentData.dentistName}`);
          await sendNotification(dentistFcmToken, 'Appointment Reminder', `You have an appointment with ${appointmentData.userName} in 30 minutes at ${appointmentData.time}.`);
          console.log(`Notification sent to dentist: ${appointmentData.dentistName}`);
        } else {
          console.log(`No FCM token found for dentist: ${appointmentData.dentistName}`);
        }
      } else {
        console.log(`Appointment at ${appointmentData.time} is not within the reminder range.`);
      }
    }
  } catch (error) {
    console.error('Error in appointmentThirtyMinutesReminderNotifications:', error);
  }
};
const appointmentUnattendedReminderNotifications = async () => {
  try {
    const currentTime = moment(); // Current time
    const todayDate = currentTime.format('DD-MM-YYYY');
    const fiveMinutesAgo = currentTime.clone().subtract(5, 'minutes').format('hh:mm A'); // Clone and subtract 5 minutes

    console.log(`Checking for unattended appointments after ${fiveMinutesAgo} on ${todayDate}`);

    const appointmentSnapshot = await admin.firestore()
      .collection('Appointments')
      .where('date', '==', todayDate)
      .get();

    if (appointmentSnapshot.empty) {
      console.log(`No appointments for today.`);
      return;
    }

    console.log(`Found ${appointmentSnapshot.docs.length} appointments for today`);

    for (const doc of appointmentSnapshot.docs) {
      const appointmentData = doc.data();
      const appointmentTime = moment(appointmentData.time, 'hh:mm A'); // Parse time string
      const timeDifference = currentTime.diff(appointmentTime, 'minutes');

      // Check if the appointment has started and is within the first 5 minutes
      if (appointmentTime.isBefore(currentTime) && timeDifference <= 5) {
        const userPending = appointmentData.userStatus === 'Pending';
        const dentistPending = appointmentData.dentistStatus === 'Pending';
        const reminderSent = appointmentData.reminderSent;

        if ((userPending || dentistPending) && !reminderSent) {
          console.log(`Sending reminder for unattended appointment at ${appointmentData.time} with Dr. ${appointmentData.dentistName}`);

          // Fetch user data
          const userSnapshot = await admin.firestore().collection('Users').doc(appointmentData.userId).get();
          const userFcmToken = userSnapshot.exists ? userSnapshot.data().fcmToken : null;
          console.log(`User FCM token: ${userFcmToken}`);

          // Fetch dentist data
          const dentistSnapshot = await admin.firestore().collection('Users').doc(appointmentData.dentistId).get();
          const dentistFcmToken = dentistSnapshot.exists ? dentistSnapshot.data().fcmToken : null;
          console.log(`Dentist FCM token: ${dentistFcmToken}`);

          // Send reminders based on who is pending
          if (userPending && userFcmToken) {
            console.log(`Sending notification to user: ${appointmentData.userName}`);
            await sendNotification(userFcmToken, 'Unattended Appointment Reminder', `Your appointment with ${appointmentData.dentistName} started at ${appointmentData.time} and has not been attended. Please check in.`);
          } else {
            console.log(`No FCM token found for user: ${appointmentData.userName}`);
          }

          if (dentistPending && dentistFcmToken) {
            console.log(`Sending notification to dentist: ${appointmentData.dentistName}`);
            await sendNotification(dentistFcmToken, 'Unattended Appointment Reminder', `Your appointment with ${appointmentData.userName} started at ${appointmentData.time} and has not been attended. Please follow up.`);
          } else {
            console.log(`No FCM token found for dentist: ${appointmentData.dentistName}`);
          }

          // Mark the reminder as sent
          await admin.firestore().collection('Appointments').doc(doc.id).update({
            reminderSent: true,
          });

        } else if (reminderSent) {
          console.log(`Reminder already sent for the appointment at ${appointmentData.time}.`);
        } else {
          console.log(`Appointment at ${appointmentData.time} has already been attended.`);
        }
      } else {
        console.log(`Appointment at ${appointmentData.time} is either outside the reminder window or not started yet.`);
      }
    }
  } catch (error) {
    console.error('Error in appointmentUnattendedReminderNotifications:', error);
  }
};






// Export the function
module.exports = { appointmentOneDayAgoReminderNotifications ,appointmentSameDayReminderNotifications,appointmentThirtyMinutesReminderNotifications,appointmentUnattendedReminderNotifications};
