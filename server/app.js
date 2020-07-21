const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port);

console.log('====================================');
console.log(`Server listening at ${port}`);
console.log('====================================');
