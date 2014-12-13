'use strict';

module.exports = function(app) {
	// Root routing
	var play = require('../../app/controllers/play.server.controller');
	app.route('/play').get(play.play);
};