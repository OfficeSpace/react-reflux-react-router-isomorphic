'use strict'

var Reflux = require('reflux')

function actions() {
  return Reflux.createActions([
    'loadBuilding',
    'searchBuildings'
  ])
}

module.exports = actions
