'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  name: String,
  text: String,
});

module.exports = mongoose.model('Message', MessageSchema);