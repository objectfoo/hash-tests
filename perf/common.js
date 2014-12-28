'use strict';

var _ = require('lodash');

exports.repeatedly = repeatedly;

function repeatedly(times, fn) {
	return _.map(_.range(times), fn);
}
