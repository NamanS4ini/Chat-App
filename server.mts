import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();


app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer)
    const userSockets = new Map(); //* To keep track of users and their rooms

    //* Set up Socket.IO
    io.on("connection", (socket) => {
        console.log(`A user connected to ${socket.id}`);
        socket.on("disconnect", () => {
            console.log(`A user disconnected from ${socket.id}`);
        });

        //* User joins a room - their socket.id gets added to that room
        socket.on("join-room", ({room, username}) => {
            socket.join(room); //* Links this socket.id to the room
            userSockets.set(socket.id, {username, room}); //* Store user info
            console.log(`User ${username} joined room ${room}`);
            socket.to(room).emit("user-joined", `${username} has joined the room`);
        });

        //* Message broadcast - goes to ALL socket.ids in that room
        socket.on("message", ({room, message, sender}) => {
            console.log(`Message from ${sender} in room ${room}:`, message);
            if (room) {
                socket.to(room).emit("message", { sender, text: message });
                //* ↑ Sends to ALL users in room EXCEPT the sender
            }
        });
        // Handle disconnect automatically
        socket.on("disconnect", () => {
            const userInfo = userSockets.get(socket.id);
            if (userInfo) {
                const {username, room} = userInfo;
                console.log(`User ${username} disconnected from room ${room}`);
                socket.to(room).emit("user-left", `${username} has left the room`);
                // Clean up
                userSockets.delete(socket.id);
            }
            console.log(`A user disconnected from ${socket.id}`);
        });

    });

    httpServer.listen(port, hostname, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });
});