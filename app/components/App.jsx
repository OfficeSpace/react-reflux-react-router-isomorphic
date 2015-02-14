/** @jsx React.DOM */
var React = require('react');
var debug = require('./Debug.jsx')

var App = module.exports = React.createClass({
  render: function() {
    debug('In app!')
    return (
      <h1>Hello!</h1>
    );
  }
});

module.exports = App