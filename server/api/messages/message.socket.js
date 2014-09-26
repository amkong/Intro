'use strict';

var message = require('./message.model');

exports.register = function(socket) {
  message.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  message.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('message:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('message:remove', doc);
}