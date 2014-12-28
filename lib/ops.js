'use strict';

var express = require('express')
  , hashdir = require('./hashdir')
  , router = express.Router()
  , base;

module.exports = ops;


function ops(dir) {
  base = dir;

  return router;
}


router.get('/-/healthcheck', function(req, res) {
  if (base) {
    hashdir(base, function(err, hashinfo) {
      if (err) return res.send(err.messages);
      res.send(hashinfo);
    });
  }
  else {
    res.send(':(');
  }
});
