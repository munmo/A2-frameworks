console.log("This is addGroup.js"); //test

const express = require('express');
const router = express.Router();
const fs = require('fs');

// Endpoint to add a new group name
router.get('/api/auth/addGroup', (req, res) => { // Updated route definition
  console.log('addGroup endpoint hit'); //test
  const groupName = req.body.groupName;

  // Read the existing group names from groups.json
  const existingGroups = JSON.parse(fs.readFileSync('./data/groups.json'));

  // Add the new group name
  existingGroups.push(groupName);

  // Save the updated group names back to groups.json
  fs.writeFileSync('./data/groups.json', JSON.stringify(existingGroups));

  res.json(existingGroups);
});

// Endpoint to fetch all group names
router.get('/api/auth/addGroup', (req, res) => {
  const groups = JSON.parse(fs.readFileSync('./data/groups.json'));
  const groupNames = groups.map(group => group.groupName);
  res.json(groupNames);
});

module.exports = router;
