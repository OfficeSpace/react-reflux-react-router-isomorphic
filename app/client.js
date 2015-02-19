'use strict'

var App = require('./components/App')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')
var refluxRequestContext = require('./refluxRequestContext')

// Bootstrap client
document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    var req = {}
    refluxRequestContext(req, null, function(){})
    React.render(<Handler req={req} />, document.body);
  });
});

