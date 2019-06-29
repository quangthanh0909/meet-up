var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');
const speakerServices = require('./services/speakerService');
const homepageServices = require('./services/homepageService');
const feedbackServices = require('./services/feedbackService');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const feedbacks = new feedbackServices(config.development.feedbackData);
const speakers =new speakerServices(config.development.speakerData);
const homedata = new homepageServices(config.development.speakerData);

app.use(async function(req,res,next){
    let speakerNames = await speakers.getNames();
    res.locals.speakerNames =speakerNames;
    next();
});

app.use(async function(req,res,next){
  let data = await feedbacks.getdata();
  // console.log(data);
  next();
});

app.use('/', indexRouter({speakers,homedata,feedbacks}));
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
