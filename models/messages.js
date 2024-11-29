const uuid = require('uuid');

const messages = [ 
  {
    id: uuid.v4(),
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    id: uuid.v4(),
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  }
];

module.exports = messages;