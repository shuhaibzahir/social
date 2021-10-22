var createError = require('http-errors');
var express = require('express');
require('dotenv').config()   
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const cors = require('cors');
const { userSignup } = require("./Middleware/validator/Allrules");
const ValidateResult = require("./Middleware/validator/ValidationResult");
const {SignIn,Signup,signInWithGoogle}= require("./routes/signinAndSignUp")
const { validateToken } = require("./Middleware/Auth/TokenVerification");
var usersRouter = require('./routes/users');






// databse require
var db = require("./config/databaseConnection")
// routers import 


var app = express();



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
  

app.use(cors({
  origin: '*'
}));

db.dbConnect(process.env.MONGODB_URL)
// view engine setup

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '@$#^&$^&*$*$&*',
  resave: false,
  saveUninitialized: true,
  
}))



 
app.post("/api/userSignup", userSignup(), ValidateResult, Signup);
app.post("/api/userSignin", SignIn);
app.post("/api/signin/with/google",signInWithGoogle)
// jwttoken applying
app.use(validateToken)
app.use('/api', usersRouter);
app.use('/api/post', usersRouter);

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
  console.log(err)
  res.send(err)
});

module.exports = app;
