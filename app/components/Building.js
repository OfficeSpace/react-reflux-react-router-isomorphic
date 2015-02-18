'use strict'

var React = require('react')
var reactAsync = require('react-async')
var Reflux = require('reflux')
var Router = require('react-router')
var debug = require('./Debug')
var Link = require('react-router').Link

var appActions = require('../actions')
var buildingStore = require('../stores/buildingStore')

var Home = require('./Home')

var Building = React.createClass({
  displayName: "Building",
  mixins: [Router.State, reactAsync.Mixin, Reflux.connect(buildingStore, "building")],

  getInitialStateAsync: function(cb) {
    var unsubscribe = buildingStore.listen(function(data) {
      unsubscribe()
      return cb(null, {
        building: data
      })
    })
    appActions.loadBuilding(this.props.id || this.getParams().id)
  },

  render: function() {
    var name = "Loading..."
    if (this.state.building != null) {
      name = this.state.building.name
    }

    return (
      <div>
        <h2>{name}</h2>
        <Link to="/">back</Link>
      </div>
    );
  }
});

module.exports = Building