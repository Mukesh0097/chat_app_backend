import express, { Request } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import path from "path";




const app = express();

const users: string[] = []

const httpServer = http.createServer(app);

app.use(cors({ origin: "*", credentials: true , allowedHeaders: ['Content-Type', 'Authorization']}));


app.get("/getuser", (req, res) => {
    res.json(users)
})

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST"],
        credentials: true,
         allowedHeaders: ['Content-Type', 'Authorization']
    }
})

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    (socket as any).username = username;
    next();
});

// io.on("connection", (socket) => {
//     socket.on("privateChatRoom", (email) => {
//         socket.join(email);
//         users.push(email);
//     })

//     socket.on('privateMessage', (data) => {
//         socket.to(users[0]).emit('new_msg', data.message);
//     })

//     socket.on("connect_error", (err) => {
//         console.log(err);
//     });
// });

io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: (socket as any).username,
        });
    }
    socket.emit("users", users);

    socket.on("privateMessage", ({ message, to }) => {
        console.log(message, to);
        socket.to(to).emit("private message", {
            message,
            from: socket.id,
        });
    });

    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: (socket as any).username,
    });
    // ...
});

httpServer.listen(8000, () => console.log("server is running on port 8000"));
