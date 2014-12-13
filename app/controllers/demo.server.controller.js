'use strict';

/**
 * Module dependencies.
 */
exports.demo = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};