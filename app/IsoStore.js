'use strict'

var Reflux = require('reflux')
var asciiJSON = require('ascii-json')

var stores = {}

class IsoStore {
  constructor(name, config) {
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

function create(name, session, config) {
  var store = new IsoStore(name, config)
  if(typeof stores[session.sid] === 'undefined') {
    stores[session.sid] = {}
  }
  stores[session.sid][name] = store
  return store
}

function injectStateIntoMarkup(session, markup) {
  var data = {}
  for (var name in stores[session.sid]) {
    data[name] = stores[session.sid][name].store.asJson()
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