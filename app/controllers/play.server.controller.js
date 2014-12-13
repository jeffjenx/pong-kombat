'use strict';

/**
 * Module dependencies.
 */
exports.play = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};