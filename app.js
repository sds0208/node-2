const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tour-routes');
const userRouter = require('./routes/user-routes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// middleware to help process data
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// example to define own middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 😺');
  // have to call next() to make it work
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
