const messages = require('../models/messages');

const getPage = function(req, res) {
  res.render('index', {
    messages : messages
  });
}

const getNew = function(req, res) {
  res.render('new');
}

const postNew = function(req, res) {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date()
  });
  res.redirect('/');
}

module.exports = {
  getPage,
  getNew,
  postNew
}