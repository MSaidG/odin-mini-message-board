const messages = require('../models/messages');
const uuid = require('uuid');

const getPage = function(req, res) {
  res.render('index', {
    messages : messages
  });
}

const getNew = function(req, res) {
  res.render('new');
}

const getMessage = function(req, res) {
  const id = req.params.id;
  const message = messages.find((message) => message.id === id);
  res.render('message', { message : message } );
}


const postNew = function(req, res) {
  messages.push({
    id: uuid.v4(),
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect('/');
}

module.exports = {
  getPage,
  getNew,
  getMessage,
  postNew,
}