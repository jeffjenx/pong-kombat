'use strict';

/**
 * Module dependencies.
 */
exports.press = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};