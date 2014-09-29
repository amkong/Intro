'use strict';

var message = require('./message.model');

exports.register = function(socket) {
  message.schema.post('save', function (msg) {
    onSave(socket, msg);
  });
  message.schema.post('remove', function (msg) {
    onRemove(socket, msg);
  });
  socket.on('message', function(msg) {
    socket.emit('message', msg);
  })
}

function onSave(socket, msg, cb) {
  socket.emit('message:save', msg);
}

function onRemove(socket, msg, cb) {
  socket.emit('message:remove', msg);
}

// exports.listenMessage = function(socket, msg) {
//   socket.on('message', function(msg) {
//     console.log('hit');
//     console.log(msg);
//     // socket.emit('message', msg);
//   });

// exports.incomingMessage = function(socket) {
//     debugger;
//     socket.on('message', function(msg) {
//       console.log("sent message");
//       console.log(msg);
//       // socket.emit('message', msg);
//     });
// };
