'use strict';

var _ = require('lodash')
	, hashcontents = require('../lib/hashcontents')
	, hashpipe = require('../lib/hashpipe')
	, path = require('path')
	, async = require('async')
	, reps = 50;

// testHashcontents();
testHashpipe();

function testHashpipe() {
	var start = process.hrtime();

	async.mapSeries(
		_.range(reps),
		function(x, cb) {
			hashpipe(path.resolve(__dirname, '../'), cb);
		},
		function (err, data) {
			var diff = process.hrtime(start)
				, ns;

			if (err) console.error(err);

			ns = (diff[0] * 1e9 + diff[1]) / reps;

			console.log((ns / 1e9) + 's per iteration');
			// console.log(data);
			void data;
		}
	);
}

function testHashcontents() {
	var start = process.hrtime();

	async.mapSeries(
		_.range(reps),
		function(x, cb) {
			hashcontents(path.resolve(__dirname, '../'), cb);
		},
		function (err, data) {
			var diff = process.hrtime(start)
				, ns;

			if (err) console.error(err);

			ns = (diff[0] * 1e9 + diff[1]) / reps;

			console.log((ns / 1e9) + 's per iteration');
			// console.log(data);
			void data;
		}
	);
}


