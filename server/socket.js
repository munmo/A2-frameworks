const fs = require('fs');

module.exports = {
  connect: function (io, PORT) {
    console.log('Initializing socket connection on port:', PORT);

    io.on('connection', (socket) => {
      console.log('New socket connection:', socket.id);

      // Handle incoming image data
      socket.on('sendImage', (data) => {
        // Convert the base64 image data to a buffer
        const imageBuffer = Buffer.from(data.image, 'base64');

        // Generate a unique filename using the current timestamp
        const timestamp = Date.now();
        const imagePath = `./userimages/${timestamp}.jpg`;

        // Save the image on the server
        fs.writeFile(imagePath, imageBuffer, (err) => {
          if (err) {
            console.error('Error saving image:', err);
            // Inform the client about the error
            socket.emit('imageUploadError', { error: 'Failed to save the image.' });
          } else {
            // Broadcast the image path to all users in the same channel except the sender
            socket.to(data.channel).emit('imageReceived', { image: imagePath });
          }
        });
      });

      socket.on('message', (message) => {
        console.log('Received message from client:', message);

        // Broadcast the message to all users in the same channel except the sender
        socket.to(message.channel).emit('message', message.text);

        socket.on('selectChannel', (channel) => {
          console.log('User joined channel:', channel);

          const username = socket.username || 'Unknown'; // Fetch username from MongoDB 
          const joinMessage = `${username} has joined the room`;

          // Emit the join message to the selected channel
          io.to(channel).emit('message', { text: joinMessage, sender: 'system' });
        });
    

        socket.on('disconnect', () => {
          console.log('Socket disconnected:', socket.id);
        });
      });
    }
    )
  }
}