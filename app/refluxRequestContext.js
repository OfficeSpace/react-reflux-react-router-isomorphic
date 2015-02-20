'use strict'

var Reflux = require('reflux')
var debug = require('debug')('refluxRequestContext')

var refluxRequestContext = function requestId(req, res, next) {
  // Load all actions
  req.actions = require('./actions')()

  // Load all stores
  req.stores = {}
  var storeNames = ['buildingStore', 'buildingsStore']
  for(var i in storeNames) {
    var storeName = storeNames[i]
    req.stores[storeName] = require('./stores/'+storeName)(req)
  }

  next()
}

module.exports = refluxRequestContext
