'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);