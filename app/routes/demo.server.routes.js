'use strict';

module.exports = function(app) {
	// Root routing
	var demo = require('../../app/controllers/demo.server.controller');
	app.route('/demo').get(demo.demo);
};