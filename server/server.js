const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http,{
    cors:{
     origin:"http://localhost:4200",
        methods:["GET","POST"],
    }
});
const sockets = require('./socket.js');
sockets.connect(io, PORT);


io.on('connection', (socket) => {
    console.log('Client connected');
    
    // Handle chat-message event
    socket.on('chat-message', (data) => {
        console.log('Received message from client:', data);

        // Broadcast to others
        socket.broadcast.emit('new-message', data);

        // If you also want to send it back to the sender
        // socket.emit('new-message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');

        const dbName = "chat";
        const db = client.db(dbName);
    
        // Uncomment these lines if you need to drop these collections
        // db.collection("users").drop();
        // db.collection("pendingRequest").drop();
        // db.collection("groups").drop();
    
        // Link routes to the main server
        require('./routes/addGroup')(db, app);
        require('./routes/getGroups')(db, app, ObjectId);
        require('./routes/login')(db, app, ObjectId);
        require('./routes/register')(db, app);
        require('./routes/users')(db, app, ObjectId);
        require('./routes/registerInterest')(db, app);
        require('./routes/confirmInterest')(db, app);
        require('./routes/pendingInterest')(db, app, ObjectId);
        require('./routes/getChannels')(db, app);

        http.listen(PORT, () => {
            console.log("Server listening on port: " + PORT);
        });

    } catch (e) {
        console.log(e);
    }
}

main().catch(console.error);
