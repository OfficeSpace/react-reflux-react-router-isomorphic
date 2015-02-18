'use strict'

var App = require('./components/App')
var React = require('react')
var Router = require('react-router')
var routes = require('./routes')

// Bootstrap client
document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(<Handler />, document.body);
  });
});

