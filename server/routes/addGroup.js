const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the users.json file
const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.post('/addGroup', (req, res) => {
  // Role validation logic
  
  const authenticatedUser = req.user;
  
  fs.readFile(usersDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    const users = JSON.parse(data);
    const user = users.find(userData => userData.username === authenticatedUser);

    if (user && (user.roles.includes('super') || user.roles.includes('group'))) {
      // Implement group creation logic here
      res.json({ message: 'Group created successfully' });
    } else {
      res.status(403).json({ message: 'You do not have permission to create a group.' });
    }
  });
});

module.exports = router;
