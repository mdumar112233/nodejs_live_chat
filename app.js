// external  import
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/usersRouter');

// internal  import 
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler')

require('dotenv').config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => console.log('database connection successfully'))
.catch(err => console.log(err))

// request  parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set view engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing  setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);


// 404 not  found handler 
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(5000)