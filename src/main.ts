// import express, { Request } from "express";
// import { Server } from "socket.io";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();




// const app = express();

// const users: string[] = []

// const httpServer = http.createServer(app);


// app.use(cors<Request>());

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })


// app.get("/getuser", (req, res) => {
//     res.json(users)
// })

// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//     }
// })

// io.use((socket, next) => {
//     const username = socket.handshake.auth.username;
//     if (!username) {
//         return next(new Error("invalid username"));
//     }
//     (socket as any).username = username;
//     next();
// });

// io.on("connection", (socket) => {
//     const users = [];
//     for (let [id, socket] of io.of("/").sockets) {
//         users.push({
//             userID: id,
//             username: (socket as any).username,
//         });
//     }
//     socket.emit("users", users);

//     socket.on("privateMessage", ({ message, to }) => {
//         console.log(message, to);
//         socket.to(to).emit("private message", {
//             message,
//             from: socket.id,
//         });
//     });

//     socket.broadcast.emit("user connected", {
//         userID: socket.id,
//         username: (socket as any).username,
//     });
//     // ...
// });

// httpServer.listen(process.env.PORT, () => console.log("server is running on port 8000"));


  import express, { Request, Response } from 'express'

  const app = express()
  const port = process.env.PORT || 8080

  app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })
