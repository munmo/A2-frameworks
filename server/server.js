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

// Other routes (login, register, etc.)
app.post('/api/auth/addGroup', require('./routes/addGroup'));
app.post('/api/auth/login', require('./routes/login'));
app.post('/api/auth', require('./routes/register'));
app.post('/api/auth/users', require('./routes/users'));



