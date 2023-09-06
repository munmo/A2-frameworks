const express = require('express');
const app = express();
const fs = require('fs').promises;

app.use(express.json());

async function getChannelsForGroup(groupName) {
  try {
    const data = await fs.readFile('./data/groups.json', 'utf8');
    const groupsArray = JSON.parse(data);
    
    const group = groupsArray.find(g => g.groupName === groupName);
    
    if (!group) {
      console.log(`Group "${groupName}" not found.`);
      return [];
    }
    
    console.log('Channels for group:', group.channels);
    return group.channels;
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
}


async function userHasAccessToGroup(username, groupName) {
  try {
    const data = await fs.readFile('./data/users.json', 'utf8');
    const parsedData = JSON.parse(data);
    const users = parsedData.users;

    if (!Array.isArray(users)) {
      console.error("users is not an array:", users);
      return false;
    }

    const user = users.find(u => u.username === username);

    if (!user) return false;

    return user.roles?.includes("Super") || user.roles?.includes("Group") || user.group?.includes(groupName);
  } catch (err) {
    console.error("An error occurred while reading the user file:", err);
    return false;
  }
}



app.post('/api/auth/getChannels', async (req, res) => {
  if (!req.body || !req.body.groupName || !req.body.username) {
    return res.status(400).json({ message: 'Bad request. groupName and username are required.' });
  }

  const { groupName, username } = req.body;

  const hasAccess = await userHasAccessToGroup(username, groupName);
    if (hasAccess) {
    const channels = await getChannelsForGroup(groupName);
    console.log('Sending these channels:', channels);  // Step 3
    return res.status(200).json(channels);
  } else {
    return res.status(403).json({ message: 'You do not have permission to view these channels.' });
  }
});

module.exports = app;
