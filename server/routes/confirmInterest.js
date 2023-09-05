var fs = require('fs');

module.exports = function(req, res) {
    console.log("Function called");
    const username = req.body.username;  
    const groupName = req.body.groupName;
    console.log("Username: ", username, ", GroupName: ", groupName);

    // Remove the entry from pendingInterest.json
    let pendingInterests = JSON.parse(fs.readFileSync('./data/pendingInterest.json'));
    pendingInterests = pendingInterests.filter((interest) => !(interest.username === username && interest.groupName === groupName));
    fs.writeFileSync('./data/pendingInterest.json', JSON.stringify(pendingInterests));
    console.log("Removed interest from pendingInterest.json");

    // Update users.json
    let data = JSON.parse(fs.readFileSync('./data/users.json'));
    let users = data.users;
    console.log("Read data from users.json", users);

    let user = users.find(u => u.username === username);

    if (user) {
        console.log("Found user: ", user);
        if (!user.group) {
            user.group = [];
        }
        user.group.push(groupName);
        console.log("Updated user group: ", user.group);

        // Write the updated data back to users.json
        fs.writeFileSync('./data/users.json', JSON.stringify(data));
        console.log("Written back to users.json");

        res.json({ message: "Interest confirmed and user updated." });
    } else {
        console.log("User not found");
        res.status(404).json({ message: "User not found" });
    }
};
