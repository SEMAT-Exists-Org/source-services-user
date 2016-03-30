// User service
// Users API resources
// author @sauliuz

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');



function userRoutes() {
  
  var userRouter = new express.Router();
  userRouter.use(cors());
  userRouter.use(bodyParser());

  
  // API resource to get all users.
  // should only acceesible for administrative users (via admin user tokens).
  userRouter.get('/', function(req, res) {

    // approach
    // 1. validate that the token submited in the request is still in the cache (if not ask for relogin)
    // 2. validate if the user attached to the token has admin priviledges (403 unauthorised if they dont)
    // 3. return the list of users if requesting user is admin.

    // response
    res.json({
      users: 'get all users',
      message: 'this resource is currentlly not implemented'
    });

  });


  // API resource for user login.
  userRouter.post('/login', function(req, res) {
      
    // approach
    // 1. get the username and password from the JSON payload
    // 2. validate the payloads with regex (username should be email, password - no weird stuff)
    // 3. request to user database (403 if not found)
    // 4. for found users, generate the token, store in the cashe. send back the username, token and TTL

    // response
    res.json({
      users: 'post user login',
      message: 'this resource is currentlly not implemented'
    });    

  });


  // API resource for user login.
  userRouter.post('/logout', function(req, res) {
      
    // approach
    // 1. get the token from JSON
    // 2. delete the token key from cache (200 ok upon success)

    // response
    res.json({
      users: 'post user logout',
      message: 'this resource is currentlly not implemented'
    });    

  });


  // API resource to create new user registration.
  userRouter.post('/register', function(req, res) {
    
    // approach
    // 1. get the username and password from the JSON payload
    // 2. validate the payloads with regex ()
    // 3. add user to the database, make them low level user by default (admin users cannot be created by mobile client)
    // 4. if create is success, generate the token, store in the cashe. send back the username, token and TTL

    // response
    res.json({
      activities: 'post user registration',
      message: 'this resource is currentlly not implemented'
    });
  });  

  
  // end of users resources
  // any new resources shuld go here

  return userRouter;
};


module.exports = userRoutes;

// the end
