'use strict';
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const _ = require('lodash');
var Comment = require('./models/comment');

var app = express();
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));
app.post('/comments' , function (req, res) {
  var newComment = Comment(req.body);
  newComment.save(function(err) {
    if (err) {
      return res.sendStatus(500);
    };
    console.log('Comment created!');
    res.sendStatus(200);
  });
});
app.get('/comments' , function (req, res) {
  Comment.find({} ,'email message createdAt', function(err, comments) {
    if (err){
      return res.sendStatus(500);
    }
    res.setHeader('Content-Type', 'application/json');

    const commentWithGravater = _.map(comments,function (comment) {
        return {
            createdAt : comment.createdAt,
            email: comment.email,
            message: comment.message,
            avatar : gravatar.url(comment.email, {s: '200', r: 'pg', d: '404'})
        };
    });
    res.send(JSON.stringify(commentWithGravater));
    console.log(commentWithGravater);
  });
});

app.use(errorHandler());
app.listen(3002, function () {
  mongoose.connect('mongodb://test:test@ds019950.mlab.com:19950/example');
  console.log('Big Panda app listening on port 3000!')
});

