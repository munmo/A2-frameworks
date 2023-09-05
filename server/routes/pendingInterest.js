var fs = require('fs');

module.exports = function(req, res) {
    let pendingInterests = JSON.parse(fs.readFileSync('./data/pendingInterest.json'));
    res.json(pendingInterests);
};