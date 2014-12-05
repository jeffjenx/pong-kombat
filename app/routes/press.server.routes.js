'use strict';

module.exports = function(app) {
	// Root routing
	var press = require('../../app/controllers/press.server.controller');
	app.route('/press').get(press.press);
};