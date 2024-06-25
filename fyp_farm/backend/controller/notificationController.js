const Notification = require('../models/notificationSchema'); // Adjust the path as needed

// Controller function to handle adding a new notification
const addNotification = async (req, res) => {
  try {
    const { message, description } = req.body;

    // Validate the input data
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Create a new notification in the database
    const newNotification = await Notification.create({
      message,
      description,
    });

    // Emit the new notification to all connected clients
    req.io.emit('new-notification', { message, description });

    // Send a success response
    res.status(201).json({ message: 'Notification added successfully', notification: newNotification });
  } catch (error) {
    // Handle errors
    console.error('Error adding notification:', error);
    res.status(500).json({ message: 'Error adding notification', error: error.message });
  }
};

// Controller function to fetch all notifications
const getNotifications = async (req, res) => {
  try {
    // Retrieve all notifications from the database
    const notifications = await Notification.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Send response
    res.status(200).json(notifications);
  } catch (error) {
    // Handle errors
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

module.exports = {
  addNotification,
  getNotifications,
};
