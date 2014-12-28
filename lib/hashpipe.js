'use strict';

module.exports = hashpipe;

var readdirp = require('readdirp')
	, through = require('through')
	, async = require('async')
	, crypto = require('crypto')
	, fs = require('fs');


function hashpipe(dir, callback) {
	var fstream = readdirp({ root: dir })
		, collectPaths = through(write, end)
		, fpaths = []
	;

	fstream
		.on('error', callback)
		.pipe(collectPaths);

	function write(data) {
		fpaths.push({
			path: data.path,
			fullPath: data.fullPath
		});
	}

	function end() {
		async.map(fpaths, checksumForFile, checksumFiles(callback));
	}
}


function checksumFiles(callback) {
	return function(err, hashs) {
		if (err) return callback(err);

		callback(null, sha1(hashs.sort().join('')));
	};
}


function checksumForFile(path, callback) {
	fs.readFile(path.fullPath, { encoding: 'utf8' }, function(err, data) {
		if (err) return callback(err);

		callback(null, sha1(path.path + ' ' + data));
	});
}


function sha1(str) {
	return crypto.createHash('sha1').update(str).digest('hex');
}
