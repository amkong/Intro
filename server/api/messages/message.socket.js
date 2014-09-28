'use strict';

var message = require('./message.model');

exports.register = function(socket) {
  message.schema.post('save', function (msg) {
    onSave(socket, msg);
  });
  message.schema.post('remove', function (msg) {
    onRemove(socket, msg);
  });
}

function onSave(socket, msg, cb) {
  socket.emit('message:save', msg);
}

function onRemove(socket, msg, cb) {
  socket.emit('message:remove', msg);
}

function listenMessage(socket, newMessage) {
  socket.on('message', msg, function(newMessage) {
    console.log('hit');
    console.log(newMessage);
  });
}