
var express = require('express');
var router = express.Router();
var fs = require('fs'); //文件
var multer = require('multer');   //上传文件中间件
var moment = require('silly-datetime'); //格式化时间
var path = require('path');


var createFolder = function (folder) {
	try {
		fs.accessSync(folder);
	} catch (e) {
		fs.mkdirSync(folder);
	}
};


function createFileName (length) {
	var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var result = ''
	for (var i = length; i > 0; --i)
		result += str[Math.floor(Math.random() * str.length)]
	return result
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const time = moment.format(new Date(), 'YYYY') //这里是按照日期通过文件夹归类文件
		var uploadFolder = './upload/' + time;   //文件按照日期分割创建文件夹
		createFolder(uploadFolder);
		cb(null, 'upload/' + time);
	},
	filename: function (req, file, cb) {
		cb(null, createFileName(6) + file.originalname.substring(file.originalname.lastIndexOf(".")));  //对当前时间戳 加文件名取MD5 加上后缀名
	}
});


// 创建 multer 对象
var upload = multer({ storage });


router.post('/file', upload.single('file'), function (req, response, next) {
	const file = req.file;
	console.log('文件类型：%s', file.mimetype);
	console.log('原始文件名：%s', file.originalname);
	console.log('文件大小：%s', file.size);
	console.log('文件保存路径：%s', file.path);
	console.log(path.resolve(__dirname, '..')+'\\'+ req.file.path);

	let fullPath = (path.resolve(__dirname, '..')+'\\'+ file.path).replace(/\\/g,'/')
  response.send({
    ...file,
		fullPath
  })
});



module.exports = router;
