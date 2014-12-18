'use strict';

module.exports = function(app) {
	// Root routing
	var terminal = require('../../app/controllers/terminal.server.controller');
	app.route('/terminal').get(terminal.terminal);
};