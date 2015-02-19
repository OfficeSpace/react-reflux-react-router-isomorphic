'use strict'

var Reflux = require('reflux')
var debug = require('debug')('refluxRequestContext')

var refluxRequestContext = function requestId(req, res, next) {
  req.actions = require('./actions')()

  req.stores = {
    buildingStore: require('./stores/buildingStore')(req)
  }
  next()
}

module.exports = refluxRequestContext
