const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

app.get('/', (req, res) => {
  res.end();
});
app.get('/favicon.ico', (req, res) => {
  // for browser request
  res.status(204).send();
});

app.use(logger((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
