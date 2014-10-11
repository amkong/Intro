'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  name: String,
  info: String,
  creator: [ {type: Schema.Types.ObjectId, ref: 'User' } ],
  userId: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  active: Boolean
});

module.exports = mongoose.model('Conversation', ConversationSchema);