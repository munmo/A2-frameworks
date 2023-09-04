console.log("This is addGroup.js"); //test

const express = require('express');
const router = express.Router();
const fs = require('fs');
const { __await } = require('tslib');

// Endpoint to add a new group name
module.exports = function(req, res) { // Updated route definition
    console.log('addGroup endpoint hit'); //test
    const groupName = req.body;

    // Read the existing group names from groups.json
    let existingGroupsString = fs.readFileSync('./data/groups.json')
    let existingGroups = JSON.parse(existingGroupsString);

    // Add the new group name
    existingGroups.push(groupName);

    // Save the updated group names back to groups.json
    console.log(existingGroups);
    fs.writeFileSync('./data/groups.json', JSON.stringify(existingGroups));

    res.json(existingGroups);
};