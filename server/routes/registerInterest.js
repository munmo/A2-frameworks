var fs = require('fs');

module.exports = function(req, res) {
  const username = req.body.username;
  const groupName = req.body.groupName;

  if (!username || !groupName) {
    return res.status(400).json({ message: "Username or groupName missing." });
  }

  let pendingInterests;
  
  try {
    pendingInterests = JSON.parse(fs.readFileSync('./data/pendingInterest.json'));
  } catch (error) {
    pendingInterests = [];
  }

  // Add the new interest
  pendingInterests.push({ username, groupName });

  // Save the updated pending interests back to pendingInterests.json
  fs.writeFileSync('./data/pendingInterest.json', JSON.stringify(pendingInterests));

  // Respond with a confirmation message
  res.json({ message: "Interest registered." });
};
