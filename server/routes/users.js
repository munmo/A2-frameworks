const express = require('express');
const router = express.Router();
const fs = require('fs'); // Require the fs module
const path = require('path');

// Path to the users.json file
const usersDataPath = __dirname + '../data/users.json';

router.get('/userData', (req, res) => {
  const authenticatedUser = req.user;

  // Read users' data from the JSON file
  fs.readFile(usersDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    const users = JSON.parse(data);
    const user = users.find(userData => userData.username === authenticatedUser);

    if (user) {
      res.json({
        roles: user.roles // Send user roles to the frontend
    
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

module.exports = router;
