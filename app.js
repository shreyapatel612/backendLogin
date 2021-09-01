var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session')
var cors = require('cors');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
console.log('local url:',corsOptions.origin);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name : 'codeil',
  secret : 'something',
  resave :false,
  saveUninitialized: true,
  cookie : {
          maxAge:(1000 * 60 * 100)
  }      
}));

const url = `mongodb+srv://shreya:shre7874@cluster0.a13vp.mongodb.net/mydb?retryWrites=true&w=majority`;

const connectionParams={
  useNewUrlParser : true,
  useCreateIndex : true,
  useUnifiedTopology : true
}

mongoose.connect(url,connectionParams)
  .then( ()=>{
    console.log('connected to Database');
  })
  .catch( (err)=>{
    console.error(`Error in connected to the database \n ${err}`);
  })

  app.get('/',(req,res)=>{
    res.send('This is Node js App');
  });
  


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles',rolesRouter);

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


