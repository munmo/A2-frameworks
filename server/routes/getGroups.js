// Endpoint to fetch all group names
var fs = require('fs');

module.exports = function(req, res) {

    let groups = JSON.parse(fs.readFileSync('./data/groups.json'));
    console.log(groups)

    let groupNames = groups.map(group => group.groupName);
    res.json(groupNames);


}