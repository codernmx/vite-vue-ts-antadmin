/*
 * @Date: 2023-05-12 11:45:13
 * @LastEditTime: 2023-06-18 14:31:54
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');

var Index = require('./routes/index');
var UserRoute = require('./routes/user');
var Gather = require('./routes/gather');
var LogRoute = require('./routes/log');
var Upload = require('./routes/upload');
var jwt = require('./utils/jwt')

var app = express();


const { uuid } = require('./utils/index');
const axios = require('axios')
const { Log } = require('./models/index')


app.use(logger('dev'));
app.use(express.json({ limit: '200mb' })) //修改请求参数限制
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', async (req, res, next) => {// 开放upload
	console.info(`${req.headers['x-real-ip']} --------------------> ${req.originalUrl}`);
	const ip = req.headers['x-real-ip']
	if (ip) {
		const ipRes = await axios.get(`https://api.map.baidu.com/location/ip?ak=Z2mZbxYsOQllRq7MqFspSrYNqG9uPa20&ip=${ip}&coor=bd09ll`)
		const address = ipRes.data['content']['address']
		await Log.create({ id: uuid(), action: req.path, address, http_user_agent: req.headers['user-agent'], ip })
	}
	next();
}, express.static(path.join(__dirname, '/upload')));

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
	let passUrl = [
		'/api/login',
		'/api/applet/student/list',
		'/api/applet/gather/list',
		'/api/upload/gather/file',
		'/api/applet/already/upload/list'
	]
	if (!passUrl.includes(req.path)) { //nginx 前缀 /api
		let token = req.headers.token;
		let result = jwt.verifyToken(token);
		if (result.code == 500) {
			res.send({
				code: 403,
				msg: '登录已过期,请重新登录',
				timestamp: new Date().getTime()
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

app.use('/api', Index);
app.use('/api', UserRoute);
app.use('/api', LogRoute);
app.use('/api/applet', Gather);
app.use('/api/upload', Upload);

const mysql_test = require('./utils/sequelize')
mysql_test.authenticate()  //用来测试数据库是否连接成功
	.then(() => {
		console.log('数据库连接成功')
	}).catch((err) => {
		console.log('数据库连接失败' + err)
	})


app.use(function (req, res, next) {
	res.send({
		msg: '接口未定义',
		code: 404,
		path: req.path,
		timestamp: new Date().getTime()
	})
});

module.exports = app;
