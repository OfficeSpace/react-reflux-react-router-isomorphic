var http = require('http');
var React = require('react');
var App = require('./components/App');
var debug = require('debug')('server');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(
    React.renderToString(
      <html>
        <body>
          <App/>
        </body>
      </html>
    )
  );
}).listen(9000, '127.0.0.1');

debug('Started')