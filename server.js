// first requiring three things Express , Cors , Dotenv
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// secondly using express to create the app and setting the port
const app = express();
const port = process.env.port || 5000;

// mongoose setup
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log(error);
  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection is established successfully!');
});

// thirdly using the cors and express json
app.use(cors());
app.use(express.json());

// route setup
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// fourthly making the app listen to port
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
