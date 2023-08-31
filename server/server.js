const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Import your routes
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/addGroup'); 

// Other routes (login, register, etc.)
app.post('/api/auth/login', require('./routes/login'));
app.post('/api/auth', require('./routes/register'));
app.post('/api/auth/users', require('./routes/users'));

app.use('/api/auth', usersRouter);
app.use('/api/auth/addGroup', groupsRouter); // Use the groupsRouter for groups routes

const server = http.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server listening on port: " + port);
});
