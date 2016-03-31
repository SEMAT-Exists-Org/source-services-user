// User service
// Users API resources
// author @sauliuz

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var fh = require('fh-mbaas-api');
var validator = require('validator');
var crypto = require('crypto');
var uuid = require('uuid');



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

    
    // read all entries from collection
    var options = {
      "act": "list",
      "type": "sematUsers" // Entity/Collection name    
    };

    // fh wrapper for db interaction
    fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);

        res.json({
          mongoerror: err
        });   


      } else {
        console.log(JSON.stringify(data));
        
        res.json({
          mongosuccess: data
        });

      }

    });

    // // response
    // res.json({
    //   users: 'get all users',
    //   message: 'this resource is currentlly not implemented'
    // });

  });


  // API resource for user login.
  userRouter.post('/login', function(req, res) {
      
    // approach
    // 1. get the username and password from the JSON payload
    // 2. validate the payloads with regex (username should be email, password - no weird stuff)
    // 3. request to user database (403 if not found)
    // 4. for found users, generate the token, store in the cashe. send back the username, token and TTL

    // retrieve request payload details
    var username = req.body.username || '';
    var password = req.body.password || '';

    // only progress if all required fields are present
    if (validator.isEmail(username) && validator.isAlphanumeric(password)) {

      // validation passed
      // find user in db
      var options = {
        "act": "list",
        "type": "sematUsers", // Entity/Collection name
        "eq": {
          "email":""+username
        }     
      };

      // mongodb request
      fh.db(options, function (err, data) {
        
        // db comms error
        if (err) {
          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          });
        }

        else {
          
          // found the user
          if (data.count == 1) {
                       
            var md5Password = crypto.createHash('md5').update(password).digest("hex");

            // user data match
            if (md5Password == data.list[0].fields.password && username == data.list[0].fields.email) {
              
              // generate uuid
              var userUuid = uuid.v1();

              // TODO
              // cache the token

              res.status(200);
              res.json({
                status: "success",
                name: ""+data.list[0].fields.name,
                email:""+data.list[0].fields.email,
                role:""+data.list[0].fields.role,
                token:""+userUuid
              });            
            
            }
            else { // user data mismatch
              
              // generic error response
              res.status(400);
              res.json({
                status: 'error',
                message: 'unsuccessful login',
                "code":"400"
              });
            }

          }
          
          else { // user with this email is not found

            // generic error response
            res.status(400);
            res.json({
              status: 'error',
              message: 'unsuccessful login',
              "code":"400"
            });
          }

        }
      });
      
    } 
    else { // payload validation failed 

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });

    }

  }); // end of /login resource


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

    // retrieve request payload details
    var name = req.body.name || '';
    var email = req.body.email || '';
    var password = req.body.password || '';

    // only progress if all required fields are present
    if (validator.isAlphanumeric(name) && validator.isEmail(email) && validator.isAlphanumeric(password)) {

      // validation passed
      // before creating new user record, verify if email address doesnt exist
      var options = {
        "act": "list",
        "type": "sematUsers", // Entity/Collection name
        "eq": {
          "email":""+email
        }     
      };

      // mongodb request
      fh.db(options, function (err, data) {
        
        // db comms error
        if (err) {
          console.error("dbcomms error: " + err);

          // error response
          res.status(500);
          res.json({
            status: 'error',
            message: 'internal error',
            "code":"500"
          }); 


        } 
        else {
          
          // if result count is more then 0 email is already in the db
          if (data.count != 0) {

            // error response
            res.status(500);
            res.json({
              status: 'error',
              message: 'email is not unique',
              "code":"400"
            });

          
          } 
          else { // email is unique

            // new user data
            var options = {
              "act": "create",
              "type": "sematUsers", // Entity/Collection name
              "fields": { 
                "name": ""+name,
                "email":""+email,
                "password":""+crypto.createHash('md5').update(password).digest("hex"),
                "role":"user"
              }
            };


            // another mongodb request
            fh.db(options, function (err, data) {
          
              // db comms error
              if (err) {
                console.error("dbcomms error: " + err);

                // error response
                res.status(500);
                res.json({
                  status: 'error',
                  message: 'internal error',
                  "code":"500"
                });

              
              } 
              else { // new user created

                // generate uuid token
                var userUuid = uuid.v1();

                // TODO
                // cache the token

                res.status(200);
                res.json({
                  status: "success",
                  name: ""+data.fields.name,
                  email:""+data.fields.email,
                  role:""+data.fields.role,
                  token:""+userUuid
                });

              }

            });     

          }

        }

      }); // end of original db query

     
    } 
    else { // payload validation failed 

      // error response
      res.status(400);
      res.json({
        status: 'error',
        message: 'malformed request, check JSON schema',
        "code":"400"
      });

    }

  });  // end of /register resource

  
  // end of users resources
  // any new resources shuld go here

  return userRouter;
};


module.exports = userRoutes;

// the end
