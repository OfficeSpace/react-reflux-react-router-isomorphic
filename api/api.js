'use strict'

var debug = require('debug')('api')

function dummyBuilding(id) {
  return {'id': id, 'name': 'Building #' + id}
}

var api = {
  routes: function(app) {

    app.get('/api/building/:id', function(req, res, next) {

      setTimeout(function() {
        res.type('application/json')
        res.json(dummyBuilding(req.params.id))
      }, 1000)

    })

    app.get('/api/buildings', function(req, res, next) {

      setTimeout(function() {
        // Dummy data
        var buildings = []
        var count = req.query.c || 100
        for(var i=0; i<count; i++) {
          buildings.push(dummyBuilding(i))
        }

        res.type('application/json')
        res.json({'query': req.query.q, 'results': buildings})
      }, 1000)

    })

  }
}

module.exports = api