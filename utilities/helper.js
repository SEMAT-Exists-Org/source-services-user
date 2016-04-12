// helper.js
//
// set of common methods used accross all API resources
// author @sauliuz



// initializer with default responses directory
var build_helper = function() {

  var helper = new Helper();
  return helper;
}


// constructor
function Helper () {
  console.log('Helper funcions loaded')
};


// Error responses //

Helper.prototype.malformed400 = function(res) {

  // 400 error response, malformed request
  res.status(400);
  res.json({
    status: 'error',
    message: 'malformed request, check JSON schema',
    "code":"400"
  });
};


Helper.prototype.generic400 = function(res) {

  // generic 400 error response
  res.status(400);
  res.json({
    status: 'error',
    message: 'bad request',
    "code":"400"
  });
};

Helper.prototype.failedLogin400 = function(res) {

  // generic failed login response
  res.status(400);
  res.json({
    status: 'error',
    message: 'unsuccessful login',
    "code":"400"
  });
};

Helper.prototype.relogin302 = function(res) {

  // no token in the cache found, relogin
  res.status(302);
  res.json({
    status: 'error',
    message: 'user must relogin',
    "code":"302"
  });
};

Helper.prototype.internal500 = function(res) {

  // error response
  res.status(500);
  res.json({
    status: 'error',
    message: 'internal error',
    "code":"500"
  });
};


// make public
module.exports = build_helper();

