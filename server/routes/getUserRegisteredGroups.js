const express = require('express');
const router = express.Router();

module.exports = function (db) {
  // Define a route to get the registered groups for the user
  router.get('/getUserRegisteredGroups', async (req, res) => {
    try {
      
      const username = 'username';

      // Query MongoDB for the user's data
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ username });

      if (user) {
        // Assuming that user.group contains the registered groups, send it as a response.
        const registeredGroups = user.group || [];

        res.json({ groups: registeredGroups });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error fetching user data from MongoDB:', err);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  });

  return router;
};
