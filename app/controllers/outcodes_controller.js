"use strict";

var logger = require("commonlog-bunyan");
var async = require("async");
var S = require("string");
var Postcode = require("../models/postcode");
var path = require("path");
var env = process.env.NODE_ENV || "development";
var defaults = require(path.join(__dirname, "../../config/config.js"))(env).defaults;

exports.showOutcode = function (request, response, next) {
	var outcode = request.params.outcode;

	Postcode.findOutcode(outcode, function (error, result) {
		if (error) return next(error);
		if (!result) {
			response.jsonApiResponse = {
				status: 404,
				result: null
			};
			return next();
		} else {
			response.jsonApiResponse = {
				status: 200,
				result: result
			};
			return next();
		}
	});
};