import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

// Global users array (persists across connections)
const users: { userID: string; username: string }[] = [];

app.use(
    cors({
        origin: "http://localhost:5173", // Match frontend
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Test route to check server status
app.get("/", (req, res) => {
    res.send("Socket.io backend is running!");
});

// Create a new Socket.io server
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
//     },
// });

// // Socket.io middleware for authentication
// io.use((socket, next) => {
//     const username = socket.handshake.auth?.username; // Use optional chaining
//     if (!username) {
//         console.log("Invalid username");
//         return next(new Error("Invalid username"));
//     }
//     (socket as any).username = username;
//     next();
// });

// Handle socket connections
// io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Add new user to the list
//     users.push({
//         userID: socket.id,
//         username: (socket as any).username,
//     });

//     // Send user list to the new user
//     socket.emit("users", users);

//     // Notify all clients that a user has connected
//     socket.broadcast.emit("user connected", {
//         userID: socket.id,
//         username: (socket as any).username,
//     });

//     // Handle private messages
//     socket.on("privateMessage", ({ message, to }) => {
//         console.log(`Message from ${socket.id} to ${to}: ${message}`);
//         socket.to(to).emit("private message", {
//             message,
//             from: socket.id,
//         });
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//         console.log(`User disconnected: ${socket.id}`);
//         const index = users.findIndex((user) => user.userID === socket.id);
//         if (index !== -1) {
//             users.splice(index, 1);
//         }
//         socket.broadcast.emit("user disconnected", socket.id);
//     });
// });

// Use dynamic port in production
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
