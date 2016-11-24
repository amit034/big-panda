'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  message: { type: String, required: true},
  email: { type: String, required: true},
  created_at: Date,
  updated_at: Date
},{
    timestamps: true
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;