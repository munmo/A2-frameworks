const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const url = 'mongodb://localhost:27017';
const dbName = 'chat';

// Use cors middleware for handling CORS issues
app.use(cors());

// Placeholder for a test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const pendingRequestsCollection = db.collection('pendingRequests');
    const groupsCollection = db.collection('groups');
    
});

// Import and initialize socket
const socketConfig = require('../socket'); 
socketConfig.connect(io, 3000);  

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
