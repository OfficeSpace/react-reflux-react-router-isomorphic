'use strict'

var debug = require('debug')('api')

var api = {
  routes: function(app) {
    app.get('/api/building/:id', function(req, res, next) {
      debug('Request URL:', req.originalUrl)
      setTimeout(function() {
        res.type('application/json')
        res.json({
          "id":req.params.id,
          "name": "Building #" + req.params.id
        })
      }, 0)
    })
  }
}

module.exports = api