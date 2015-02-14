var http = require('http');
var express = require('express')

var React = require('react');
var reactAsync = require('react-async')
var App = require('./components/App')
var debug = require('debug')('server')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(favicon(path.join(__dirname, '../public/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  try {
    reactAsync.renderToStringAsync(
      <html>
        <body>
          <App/>
          <script type="text/javascript" src="/js/main.js"></script>
        </body>
      </html>, function(err, markup) {
        if(err) {
          debug(err)
          return next()
        }
        return res.end('<!DOCTYPE html>' + markup)
      }    
    )
  }
  catch(err) {
    debug(err)
    return next()
  }

})

// handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  })
})

app.set('port', process.env.PORT || 9999);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
