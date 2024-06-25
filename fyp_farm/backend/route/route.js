const express = require('express');
const { addNotification, getNotifications } = require('../controller/notificationController'); // Adjust the path as needed

const router = express.Router();

// Route to handle adding a new notification
router.post('/add', addNotification);

// Route to fetch all notifications
router.get('/', getNotifications);

module.exports = router;
