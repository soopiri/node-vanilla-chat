const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const dayjs = require('dayjs')

const app = express();
const server = http.createServer(app);

const io = socketIO(server)

app.use(express.static(path.join(__dirname, 'src')));
const PORT = process.env.PORT || 9999;

io.on('connection', (socket) => {
  socket.on("chatting", (data)=> {
    const { name, msg } = data;
    io.emit("chatting", {name: name, msg: msg, time: dayjs().format("A HH:mm")})
  })
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));