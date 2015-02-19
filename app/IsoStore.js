'use strict'

var Reflux = require('reflux')
var asciiJSON = require('ascii-json')
var debug = require('debug')('isostore')

var stores = {}

class IsoStore {
  constructor(name, req, config) {
    this.name = name
    this.store = Reflux.createStore(config)
    this.loadSerializedData()
  }

  loadSerializedData() {
    if (!(typeof window === 'undefined') && window.__isoStoreState != null) {
      var data = window.__isoStoreState[this.name]
      if (data != null) {
        this.store.fromJson(data)
      }
    }
  }
}

function create(name, req, config) {
  return new IsoStore(name, req, config)
}

function injectStateIntoMarkup(req, markup) {
  var data = {}
  for (var name in req.stores) {
    data[name] = req.stores[name].store.asJson()
  }

  var escapedJson = asciiJSON.stringify(data).replace(/<\//g, '<\\/');
  var injected = '<script>window.__isoStoreState=' + escapedJson + '</script>';

  if (markup.indexOf('</body>') > -1) {
    return markup.replace('</body>', injected + '$&')
  } 
  else {
    return markup + injected;
  }
}

module.exports = {
  'create': create,
  'injectStateIntoMarkup': injectStateIntoMarkup
}