module.exports = {
    connect: function(io, PORT) {
        console.log('Initializing socket connection on port:', PORT);

        io.on('connection', (socket) => {
            console.log('New socket connection:', socket.id);

            socket.on('message', (message) => {
                console.log('Received message from client:', message);
                socket.broadcast.emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected:', socket.id);
            });
        });
    }
}
