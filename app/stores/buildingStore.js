'use strict'

var request = require('superagent')

var IsoStore = require('../IsoStore')
var appActions = require('../actions')
var appConfig = require('../config')

function createBuildingStore(session) {
  return IsoStore.create('buildingStore', session, {

    init: function() {
      this.buildingData = {}
      this.listenTo(appActions.loadBuilding, this.loadBuildingData)
    },

    loadBuildingData: function() {
      var buildingId = arguments[0]
      if(this.buildingData[buildingId]) {
        this.trigger(this.buildingData[buildingId])
      }
      else {
        var self = this
        request
          .get(appConfig.LOCAL_API_HOST + '/api/building/' + buildingId)
          .end(function(err, res) {
            if(res.body) {
              self.buildingData[buildingId] = res.body
              self.trigger(res.body)
            }
        })
      }
    },

    asJson: function() {
      return(this.buildingData)
    },

    fromJson: function(data) {
      this.buildingData = data
    }
  })
}

module.exports = createBuildingStore