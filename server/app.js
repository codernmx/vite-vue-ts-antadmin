var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Index = require('./routes/index');
var Upload = require('./routes/upload');
var jwt = require('./utils/jwt')

var app = express();


app.use(logger('dev'));
// app.use(express.json());
app.use(express.json({limit: '200mb'}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, '/upload')));

/* 跨域 */
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', ['token', 'Content-Type']);
	next();
});

/* 所有请求都过token校验 */
app.use(function (req, res, next) {
	let passUrl = ['/api/login']
	if (!passUrl.includes(req.url) && (req.url.indexOf('upload') == -1)) {
		let token = req.headers.token;
		let result = jwt.verifyToken(token);
		if (result.code == 500) {
			res.send({
				code: 403,
				msg: '登录已过期,请重新登录'
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

app.use('/api', Index);
app.use('/api/upload', Upload);






app.use(function (req, res, next) {
	res.send({
		msg: '接口未定义',
		code: 404
	})
});

module.exports = app;
