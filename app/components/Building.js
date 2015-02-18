'use strict'

var React = require('react');
var Router = require('react-router')
var debug = require('./Debug')
var Link = require('react-router').Link

var Home = require('./Home')

var Building = module.exports = React.createClass({
  mixins: [Router.State],
  render: function() {
    return (
      <div>
        <h2>Building {this.getParams().id}</h2>
        <Link to="/">back</Link>
      </div>
    );
  }
});

module.exports = Building