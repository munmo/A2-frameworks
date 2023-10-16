module.exports = function (db, app) {
  app.delete('/api/deleteGroup/:groupName', async function (req, res) {
    const groupName = req.params.groupName; // Use req.params.groupName to get the dynamic parameter.

    try {
      const groupsCollection = db.collection('groups');

      // Check if the group exists
      const group = await groupsCollection.findOne({ group: groupName });
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // If authorized, delete the group
      await groupsCollection.deleteOne({ group: groupName });
      res.json({ message: 'Group deleted successfully' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};
