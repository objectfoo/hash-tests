'use strict';

// verify count of files in a directory on *nix
// doesn't include symlinks device files etc.
// find /Users/andy/projects/hash -type f  -print | wc -l

module.exports = hashcontents;

var readdirp = require('readdirp')
	, async = require('async')
	, fs = require('graceful-fs')
	, crypto = require('crypto')
	;


function hashcontents(dir, callback) {
	var fstream = readdirp({ root: dir })
		, fpaths = [];

	fstream.on('error', callback);
	fstream.on('data', function(entry) {
		fpaths.push({
			path: entry.path,
			fullPath: entry.fullPath
		});
	});
	fstream.on('end', function() {
		async.mapSeries(fpaths, checksumForFile, checksumFiles(callback));
	});
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

		callback(null, sha1(path.path + data));
	});
}


function sha1(str) {
	return crypto.createHash('sha1').update(str).digest('hex');
}
