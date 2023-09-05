const express = require('express');
const router = express.Router();
const fs = require('fs');
const { __await } = require('tslib');

// Endpoint to add a new group name
module.exports = function(req, res) {
    console.log('addGroup endpoint hit');
    const groupName = req.body.groupName;

    // Read the existing group names from groups.json
    let existingGroupsString = fs.readFileSync('./data/groups.json');
    let existingGroups = JSON.parse(existingGroupsString);

    // Add the new group name as an object with 'groupName' and 'channels' fields
    existingGroups.push({ groupName: groupName, channels: [] });

    // Save the updated group names back to groups.json
    fs.writeFileSync('./data/groups.json', JSON.stringify(existingGroups));

    res.json(existingGroups); // Send back the updated list
};
