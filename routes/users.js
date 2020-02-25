const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((request, response) => {
  User.find()
    .then(users => response.json(users))
    .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/add').post((request, response) => {
  const username = request.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => response.json('User added!'))
    .catch(error => response.status(400).json('Error: ' + error));
});

module.exports = router;
