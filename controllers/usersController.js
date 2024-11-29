const usersStorage = require('../models/UsersStorage');
const {body, validationResult} = require('express-validator');

const alphaErr = "Must only contain alphabetical characters";
const lengthErr = "Must be between 2 and 20 characters";

const validateUser = [
  
  body("firstName").trim()
  .isAlpha().withMessage(alphaErr)
  .isLength({min: 2, max: 20}).withMessage(lengthErr),
  
  body("lastName").trim()
  .isAlpha().withMessage(alphaErr)
  .isLength({min: 2, max: 20}).withMessage(lengthErr),

  body("email").trim()
  .isEmail().withMessage("Must be a valid email address")
  .custom( async (value) => {
    const user = await usersStorage.getUserByEmail(value);
    if (user) {
      throw new Error("Email already in use");
    }
  }),

  body("age").optional({checkFalsy: true}).trim()
  .isNumeric().withMessage("Age must be a number")
  .isInt({min: 18, max: 150}).withMessage("Age must be between 18 and 150"), 

  body("bio").optional({checkFalsy: true}).trim()
  .isLength({ max: 200}).withMessage("Bio must be less than 200 characters"),
]

const usersListGet = function(req, res) {
  res.render('users/index', {
    title: 'User List',
    users: usersStorage.getUsers(),
  });
}

const usersCreateGet = function(req, res) {
  res.render('users/create', {
    title: 'Create User',
  });
}

const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('users/create', {
        title: 'Create User',
        errors: errors.array(),
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        age : req.body.age,
        bio : req.body.bio,
      });
    } else {
      const {firstName, lastName, email, age, bio} = req.body;
      usersStorage.addUser(firstName, lastName, email, age, bio);
      res.redirect('/users');
    }
  }
];

const usersUpdateGet = function(req, res) {
  const id = req.params.id;
  const user = usersStorage.getUser(id);
  res.render('users/update', {
    title: 'Update User',
    user: user,
  });
}

const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render('users/update', {
        title: 'Update User',
        user: user,
        errors: errors.array(),
      });
    } else {
      const {firstName, lastName, email, age, bio} = req.body;
      usersStorage.updateUser(req.params.id, {firstName, lastName, email, age, bio});
      res.redirect('/users');
    }
  }
];

const usersDeletePost = function(req, res) {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/users');
}

const usersSearchGet = function(req, res) {
  const user = usersStorage.getUserByEmail(req.query.email);
  res.render('users/search', {
    title: 'Search Users',
    user: user
  });
}

module.exports = {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
  usersDeletePost,
  usersSearchGet,
}

