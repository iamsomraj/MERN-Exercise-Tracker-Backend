const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// getting all the list of exercises 
router.route('/').get((request, response) => {
  Exercise.find()
    .then(exercises => response.json(exercises))
    .catch(error => response.status(400).json('Error: ' + error));
});


// finding an exercise by an id
router.route('/:id').get((request, response) => {
  Exercise.findById(request.params.id)
    .then(exercise => response.json(exercise))
    .catch(error => response.status(400).json('Error: ' + error));
});

// finding and deleting an exercise by an id
router.route('/:id').delete((request, response) => {
  Exercise.findByIdAndDelete(request.params.id)
    .then(exercise => response.json('Exercise deleted!'))
    .catch(error => response.status(400).json('Error: ' + error));
});

// finding and updating an id
router.route('/update/:id').post((request, response) => {
  Exercise.findById(request.params.id)
    .then(exercise => {
      exercise.username = request.body.username;
      exercise.description = request.body.description;
      exercise.duration = Number(request.body.duration);
      exercise.date = Date.parse(request.body.date);
      exercise
        .save()
        .then(() => response.json('Exercise updated!'))
        .catch(error => response.status(400).json('Error: ' + error));
    })
    .catch(error => response.status(400).json('Error: ' + error));
});

// adding an exercise
router.route('/add').post((request, response) => {
  const username = request.body.username;
  const description = request.body.description;
  const duration = Number(request.body.duration);
  const date = Date.parse(request.body.date);
  const newExercise = new Exercise({ username, description, duration, date });
  newExercise
    .save()
    .then(() => response.json('Exercise added!'))
    .catch(error => response.status(400).json('Error: ' + error));
});

module.exports = router;
