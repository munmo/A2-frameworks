const express = require('express');
const router = express.Router();

// This function assumes that you're passing the database connection from your main server file
module.exports = function(db) {
  router.get('/userData', async (req, res) => {
    const authenticatedUser = req.user;

    try {
      // Query MongoDB for the user's data
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ username: authenticatedUser });

      if (user) {
        res.json({
          roles: user.roles // Send user roles to the frontend
        });
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
