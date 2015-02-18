'use strict'

var React = require('react');
var debug = require('./Debug')
var Link = require('react-router').Link

var Home = module.exports = React.createClass({
  getInitialState: function() {
    return {
      buildings: [
        {
          id: "1",
          name: "Building 1"
        },
        {
          id: "2",
          name: "Building 2"
        },
        {
          id: "3",
          name: "Building 3"
        },
      ]
    }    
  },

  render: function() {
    var buildings = this.state.buildings.map(function(building){
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
  }
});

module.exports = Home