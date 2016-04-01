// User service
// Users API resources
// author @sauliuz

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


function notSupportedRoutes() {
  
  var router = new express.Router();
  router.use(cors());
  router.use(bodyParser());

  
  router.get('*', function(req, res) {

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });
  });

  router.post('*', function(req, res) {

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });
  });

  
  // any new resources shuld go here

  return router;
};


module.exports = notSupportedRoutes;

// the end
