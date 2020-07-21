const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/APIAuthenticationTEST', {
    useNewUrlParser: true,
  });
} else {
  mongoose.connect('mongodb://localhost/APIAuthentication', {
    useNewUrlParser: true,
  });
}
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port);

console.log('====================================');
console.log(`Server listening at ${port}`);
console.log('====================================');
