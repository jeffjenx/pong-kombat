'use strict';

module.exports = function(app) {
	// Root routing
	var teaser = require('../../app/controllers/teaser.server.controller');
	app.route('/teaser').get(teaser.teaser);
};