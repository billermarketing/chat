// server port
const PORT = 8081;

// express
const express = require("express");
const app = express();
app.use(express.static("public"));

// socket.io
const http = require("http");
const socketIo = require("socket.io");
const webServer = http.Server(app);
const io = socketIo(webServer);

// module
const chatModule = require("./ChatModule.js");

// global
let user = [];

io.on("connection", socket => {
    io.emit("user join", "User join!");

    socket.on("disconnect", () => {
        io.emit("user leave", "User leave!");
    });
});

webServer.listen(PORT, () => {
    console.log("Verbindung steht: http://localhost:" + PORT + "/");
});