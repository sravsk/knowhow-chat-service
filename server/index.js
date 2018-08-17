const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const server = http.createServer(app);
const io = require('socket.io')(server);


const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

let users = {};

createSocket = (user) => {
    let cur_user = users[user.uid],
        updated_user = {
            [user.uid] : Object.assign(cur_user, {sockets : [...cur_user.sockets, user.socket_id]})
        };
    users = Object.assign(users, updated_user);
};

getUsers = () => {
    return Object.keys(users).map(function(key){
        return users[key].user
    });
};

createUser = (user) => {
    users = Object.assign({
        [user.uid] : {
            user : user.user,
            uid : user.uid,
            sockets : [user.socket_id]
        }
    }, users);
};

removeSocket = (socket_id) => {
    let uid = '';
    Object.keys(users).map(function(key){
        let sockets = users[key].sockets;
        if(sockets.indexOf(socket_id) !== -1){
            uid = key;
        }
    });
    let user = users[uid];
    if(user.sockets.length > 1){
        // Remove socket only
        let index = user.sockets.indexOf(socket_id);
        let updated_user = {
            [uid] : Object.assign(user, {
                sockets : user.sockets.slice(0,index).concat(user.sockets.slice(index+1))
            })
        };
        users = Object.assign(users, updated_user);
    }else{
        // Remove user by key
        let clone_users = Object.assign({}, users);
        delete clone_users[uid];
        users = clone_users;
    }
};


io.on('connection', (socket) => {
  //start emitting events to the client 
  //console.log('a user connected', socket.id);

  let query = socket.request._query;
  let user = {
  	user : query.user, 
  	uid : query.uid, 
  	socket_id : socket.id 
  }

  if(users[user.uid] !== undefined){
  	createSocket(user);
  	socket.emit('updateUsersList', getUsers());
  } else {
    createUser(user);
    io.emit('updateUsersList', getUsers());
   }

  socket.on('message', (data) => {
  	//console.log("data", data);
  	socket.broadcast.emit('message', {
  		user : data.user,
  		message : data.message,
  		uid : data.uid
  	})
  })

  socket.on('typing', (data) => {
  	socket.broadcast.emit('typing', {
  		user : socket.user
  	})
  })

  socket.on('disconnect', () => {
    //console.log('user disconnected', socket.id);
    removeSocket(socket.id);
    io.emit('updateUsersList', getUsers());
  });

  socket.on('error', (err) => {
  	console.log("error received from client : ", socket.id)
  });

});

server.listen(port, () => {
  //server is listening for socket clients to connect on port 5000
  console.log('listening on PORT:' + port);
});