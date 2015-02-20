'use strict'

var React         = require('react')
var Router        = require('react-router')
var Route         = Router.Route
var DefaultRoute  = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

/* Components */
var App  = require('./components/App')
var Buildings  = require('./components/Buildings')
var Building  = require('./components/Building')

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Buildings}/>
    <Route name="building" path="/building/:id" handler={Building}/>
    <Route name="buildings" path="/buildings" handler={Buildings}/>
  </Route>
)

module.exports = routes