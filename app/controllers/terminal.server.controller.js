'use strict';

/**
 * Module dependencies.
 */
exports.terminal = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};