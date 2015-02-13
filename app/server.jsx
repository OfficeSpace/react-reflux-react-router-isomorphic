var http = require('http');
var React = require('react');
var reactAsync = require('react-async')
var App = require('./components/App');
var debug = require('debug')('server');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  try {
    reactAsync.renderToStringAsync(
      <html>
        <body>
          <App/>
        </body>
      </html>, function(err, markup) {
        if(err) {
          throw err
        }
        return res.end('<!DOCTYPE html>' + markup)
      }    
    )
  }
  catch(err) {
    throw err
  }

}).listen(9000, '127.0.0.1');

debug('Started')