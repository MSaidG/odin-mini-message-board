const messages = require('../models/messages');
const db = require('../db/queries');
const pool = require('../db/pool');


const getPage = async function(req, res) {
  const messages = await db.selectAllMessages();
  res.render('index/index', {
    messages : messages
  });
}

const getNew = function(req, res) {
  res.render('index/new');
}

const getMessage = async function(req, res) {
  const message = await db.selectMessageById(req.params.id);
  res.render('index/message', { message : message } );
}


const postNew = async function(req, res) {
  const message ={
    text: req.body.text,
    username: req.body.username,
  };
  await db.insertMessage(message);
  res.redirect('/');
}

module.exports = {
  getPage,
  getNew,
  getMessage,
  postNew,
}