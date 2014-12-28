'use strict';

var path = require('path')
	, express = require('express')
	, app = express()
	, ops = require('./ops');


app.get('/', function(req, res) {
	res.send('ok');
})
.use(ops(path.resolve(__dirname, '../')))
.listen(3000);
