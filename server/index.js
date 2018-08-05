const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const server = http.createServer(app);
const io = require('socket.io')(server);


const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

io.on('connection', (socket) => {
  //start emitting events to the client 
  console.log('a user connected', socket.id);

  socket.on('message', (data) => {
  	console.log(data);
  	socket.broadcast.emit('message', {
  		message : data.message
  	})

  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.on('error', (err) => {
  	console.log("error received from client : ", socket.id)
  });

});

server.listen(port, () => {
  //server is listening for socket clients to connect on port 5000
  console.log('listening on PORT:' + port);
});