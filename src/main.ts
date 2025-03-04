import express, { Request } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";




const app = express();

const users: string[] = []

const httpServer = http.createServer(app);


app.use(cors<Request>());

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.get("/getuser", (req, res) => {
    res.json(users)
})

const io = new Server(httpServer, {
    cors: {
        origin: "*",
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

app.listen(5000, () => console.log("server is running on port 5000"));
httpServer.listen(8000, () => console.log("server is running on port 8000"));
