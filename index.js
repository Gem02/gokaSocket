const io = require('socket.io')(8800, {
    cors: {
        origin: ["https://gokasample.vercel.app", 'http://localhost:3001']
    }
});

io.on("connection", (socket) => {

    // Joining a chat room
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        //console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Send message to a specific room
    socket.on("send-message", (data) => {
        const { chatId, receiverId } = data;
        io.to(chatId).emit("receive-message", data);
        //console.log('Message sent to room:', chatId, 'Data:', data);
    });

    socket.on("disconnect", () => {
        //console.log("User disconnected: " + socket.id);
    });
});
