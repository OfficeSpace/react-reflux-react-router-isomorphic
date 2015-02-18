'use strict'

var React         = require('react')
var Router        = require('react-router')
var Route         = Router.Route
var DefaultRoute  = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

/* Components */
var App  = require('./components/App')
var Home  = require('./components/Home')
var Building  = require('./components/Building')

var routes = (
  <Route name="home" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="building" path="/building/:id" handler={Building}/>
  </Route>
)

module.exports = routes