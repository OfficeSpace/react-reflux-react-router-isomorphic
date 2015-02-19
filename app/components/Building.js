'use strict'

var React = require('react')
var reactAsync = require('react-async')
var Reflux = require('reflux')
var Router = require('react-router')
var debug = require('./Debug')
var Link = require('react-router').Link

var appActions = require('../actions')
var Home = require('./Home')

var Building = React.createClass({
  displayName: "Building",
  mixins: [Router.State, reactAsync.Mixin, Reflux.ListenerMixin],

  componentWillMount: function() {
    this.props.session.buildingStore = require('../stores/buildingStore')(this.props.session).store
  },

  componentDidMount: function() {
    this.listenTo(this.props.session.buildingStore, this.updateData)
  },

  updateData: function(data) {
    this.setState({
      building: data
    })
  },

  getInitialStateAsync: function(cb) {
    var unsubscribe = this.props.session.buildingStore.listen(function(data) {
      unsubscribe()
      return cb(null, {
        building: data
      })
    })
    appActions.loadBuilding(this.id())
  },

  render: function() {
    var building = this.state.building
    var name = "Loading..."
    if (building != null) {
      name = building.name
    }

    return (
      <div>
        <h2>{name} -- {this.props.session.token} </h2>
        <Link to="/">back</Link>
      </div>
    );
  },

  id: function() {
    return(this.props.id || this.getParams().id)
  }
});

module.exports = Building