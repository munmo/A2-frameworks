const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const fs = require('fs'); // Include the 'fs' module to work with file operations

const server = http.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server listening on port: " + port);
});

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/auth/addGroup', require('./routes/addGroup'));
app.get('/api/auth/getGroups', require('./routes/getGroups')); 
app.post('/api/auth/login', require('./routes/login'));
app.post('/api/auth', require('./routes/register'));
app.post('/api/auth/users', require('./routes/users'));
app.post('/api/auth/registerInterest', require('./routes/registerInterest'));
app.post('/api/auth/confirmInterest', require('./routes/confirmInterest'));
app.get('/api/auth/pendingInterest', require('./routes/pendingInterest'));
app.post('/api/auth/getChannels', require('./routes/getChannels'));

