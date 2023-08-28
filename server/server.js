var express = require('express');
var app = express();
var http = require('http').Server(app);
var cors = require('cors');

app.use(cors());
app.use(express.json());

// Set up your routes for login and register
app.post('/api/login', require('./routes/login'));
app.post('/api/register', require('./routes/register'));

let server = http.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server listening on port: " + port);
});