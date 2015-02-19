'use strict'

var React = require('react')
var reactAsync = require('react-async')
var Reflux = require('reflux')
var Router = require('react-router')
var debug = require('./Debug')
var Link = require('react-router').Link

var Home = require('./Home')

var Building = React.createClass({
  displayName: "Building",
  mixins: [Router.State, reactAsync.Mixin, Reflux.ListenerMixin],

  componentDidMount: function() {
    this.listenTo(this.props.req.stores.buildingStore.store, this.updateData)
  },

  updateData: function(data) {
    this.setState({
      building: data
    })
  },

  getInitialStateAsync: function(cb) {
    var unsubscribe = this.props.req.stores.buildingStore.store.listen(function(data) {
      unsubscribe()
      return cb(null, {
        building: data
      })
    })
    this.props.req.actions.loadBuilding(this.id())
  },

  render: function() {
    var building = this.state.building
    var name = "Loading..."
    if (building != null) {
      name = building.name
    }

    return (
      <div>
        <h2>{name}</h2>
        <Link to="/">back</Link>
      </div>
    );
  },

  id: function() {
    return(this.props.id || this.getParams().id)
  }
});

module.exports = Building