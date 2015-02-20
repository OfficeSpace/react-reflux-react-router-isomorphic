'use strict'

var request = require('superagent')
var IsoStore = require('../IsoStore')
var appConfig = require('../config')

function createBuildingsStore(req) {
  return IsoStore.create('buildingsStore', req, {

    init: function() {
      this.buildingsData = {}
      this.listenTo(req.actions.searchBuildings, this.loadBuildings)
    },

    loadBuildings: function() {
      var query = arguments[0]
      if(this.buildingsData[query]) {
        this.trigger(this.buildingsData[query])
      }
      else {
        var self = this
        request
          .get(appConfig.LOCAL_API_HOST + '/api/buildings?q=' + query)
          .end(function(err, res) {
            if(res.body) {
              self.buildingsData[query] = res.body
              self.trigger(res.body)
            }
        })      
      }
    },

    asJson: function() {
      return(this.buildingsData)
    },

    fromJson: function(data) {
      this.buildingsData = data
    }

  })
}

module.exports = createBuildingsStore