/* jslint node: true */
'use strict';

var apickli = require('apickli');

module.exports = function() {
	
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'localhost:8001');
		callback();
	});

	// using the apickli-framework implementation

};