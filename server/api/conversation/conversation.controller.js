'use strict';

var _ = require('lodash');
var Conversation = require('./conversation.model');
// var User = require('../user/user.model')

// Get list of conversations
// exports.index = function(req, res) {
//   Conversation.find(function (err, conversations) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, conversations);
//   });
// };

exports.index = function(req, res) {
  var userId = req.params.id;
  Conversation.find( { 'creator': userId }, function(err, conversations) {
    if(err) { return handleError(res, err); }
    if(!conversations) { return res.send(404); }
    console.log(conversations);
    return res.json(200, conversations);
  });
}

// Get a single conversation
exports.show = function(req, res) {
  Conversation.findById(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    return res.json(conversation);
  });
};


// Creates a new conversation in the DB.
exports.create = function(req, res) {
  Conversation.create(req.body, function(err, conversation) {
    if(err) { return handleError(err); }
    Conversation.findOne(conversation)
    .populate('creator userId')
    .exec(function(err, conversation) {
      if(err) { return handleError(err); }
      return res.json(201, conversation);
    });
  });
}

// Updates an existing conversation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Conversation.findById(req.params.id, function (err, conversation) {
    if (err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    var updated = _.merge(conversation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      console.log(conversation);
      return res.json(200, conversation);
    });
  });
};

// Deletes a conversation from the DB.
exports.destroy = function(req, res) {
  Conversation.findById(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    conversation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}