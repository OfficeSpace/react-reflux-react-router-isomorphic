'use strict'

var React = require('react')
var debug = require('./Debug')

var Router = require('react-router')
var DefaultRoute = Router.DefaultRoute
var Link = Router.Link
var Route = Router.Route
var RouteHandler = Router.RouteHandler

var App = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App</h1>
        <RouteHandler req={this.props.req}/>
      </div>
    );
  }
});

module.exports = App