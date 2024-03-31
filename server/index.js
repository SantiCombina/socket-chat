import express from "express"
import http from "http"
import { Server } from "socket.io"
import { PORT } from "./config.js"
import morgan from "morgan"
import { resolve } from "path"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(morgan("dev"))
app.use(express.static(resolve("app/dist")))

app.get("/chat", (req, res) => {
    res.sendFile("app/dist/index.html")
})

let messages = {}

io.on("connection", socket => {

    socket.on("joinRoom", (room) => {
        if (!messages[room]) {
            messages[room] = [];
        }
        socket.join(room)
        io.to(room).emit("messagesHistory", messages[room]);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
    });

    socket.on("messages", (msg) => {
        messages[msg.room]?.push(msg)
        io.to(msg.room).emit("messages", messages[msg.room]);
    });
});

server.listen(PORT)