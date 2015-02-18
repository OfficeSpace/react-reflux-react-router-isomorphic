var Reflux = require('reflux')
var request = require('superagent')

var appActions = require('../actions')
var appConfig = require('../config')

var buildingStore = Reflux.createStore({

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
  }

})

module.exports = buildingStore