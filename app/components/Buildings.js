'use strict'

var React = require('react')
var reactAsync = require('react-async')
var Reflux = require('reflux')
var Router = require('react-router')
var debug = require('debug')('buildings')
var Link = require('react-router').Link

var Buildings = React.createClass({
  displayName: "Buildings",
  mixins: [Router.State, reactAsync.Mixin, Reflux.ListenerMixin],

  componentDidMount: function() {
    this.listenTo(this.props.req.stores.buildingsStore.store, this.updateData)
  },

  updateData: function(data) {
    this.setState({
      buildings: data
    })
  },

  getInitialStateAsync: function(cb) {
    var unsubscribe = this.props.req.stores.buildingsStore.store.listen(function(data) {
      unsubscribe()
      return cb(null, {
        buildings: data
      })
    })
    this.props.req.actions.searchBuildings(this.query())
  },

  render: function() {
    if(this.state.buildings == null || this.state.buildings.results == null) {
      return <h2>Loading...</h2>
    }

    var buildings = this.state.buildings.results.map(function(building){
      var link = "/building/" + building.id
      return(
        <li key={building.id}>
          <Link to={link}>{building.name}</Link>
        </li>
      )
    })
    return (
      <div>
        <h2>Buildings!</h2>
        <ul>
          {buildings}
        </ul>
      </div>
    );

  },

  query: function() {
    return(this.props.query || this.getQuery().q)
  }
});

module.exports = Buildings

