'use strict';

/**
 * Module dependencies.
 */
exports.teaser = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};