const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const path = require('path');
var fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const socketIo = require('socket.io');
const formidable = require('formidable');
app.use(cors());

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http,{
    cors:{
     origin:"http://localhost:4200",
        methods:["GET","POST"],
    }
});
const sockets = require('./socket.js');
// sockets.connect(io, PORT);


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
// Serve Angular app (adjust the path accordingly)
app.use(express.static(__dirname + '/angular-dist'));
// Serve images from the '/images' route
app.use('/images', express.static(path.join(__dirname, '../server/userimages')));

// Serve uploads from the '/uploads' route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');

        const dbName = "chat";
        const db = client.db(dbName);
    
        // Link routes to the main server
        require('./routes/addGroup')(db, app);
        require('./routes/getGroups')(db, app, ObjectId);
        require('./routes/deleteGroups')(db, app); 
        require('./routes/login')(db, app, ObjectId);
        require('./routes/register')(db, app);
        require('./routes/users')(db, app, ObjectId);
        require('./routes/registerInterest')(db, app);
        require('./routes/confirmInterest')(db, app);
        require('./routes/pendingInterest')(db, app, ObjectId);
        require('./routes/getChannels')(db, app); 
        require('./routes/getUserRegisteredGroups.js')(db, app);
        require('./routes/uploads.js')(app, formidable, fs, path);
        
        http.listen(PORT, () => {
            console.log("Server listening on port: " + PORT);
        });

    } catch (e) {
        console.log(e);
    }
}

main().catch(console.error);