const http = require('http');
const express = require('express');
const path = require('path');
const io = require('socket.io')(http);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

io.on('connection', (client) => {
  //start emitting events to the client 
  console.log('a user connected');

  client.on('disconnect', () => {
    console.log('user disconnected', client.id);
  });

  client.on('error', (err) => {
  	console.log("error received from client : ", client.id)
  });

});

server.listen(port, () => {
  //server is listening for socket clients to connect on port 5000
  console.log('listening on PORT:5000');
});