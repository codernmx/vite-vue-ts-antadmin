var express = require('express');
var router = express.Router();
var fs = require('fs'); //文件
var multer = require('multer');   //上传文件中间件
var moment = require('silly-datetime'); //格式化时间
const { success, fail, randomChar, uuid } = require('../utils/index');//成功失败
const path = require('path');
const { File, StudentFile } = require('../models/index')
const { fileUrl } = require('../config/index')

// 创建文件夹  使用此代码就是为了让我们查找磁盘中是否有该文件夹，如果没有，可以自动创建，而不是我们提前手动创建好。如果不使用此代码，则我们再使用该文件夹之前，需要手动创建好当前文件夹
var createFolder = function (folder) {
	try {
		fs.accessSync(folder);
	} catch (e) {
		fs.mkdirSync(folder);
	}
};


// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const time = new Date().getFullYear() //这里是按照日期通过文件夹归类文件
		var uploadFolder = './upload/' + time;   //文件按照日期分割创建文件夹
		createFolder(uploadFolder);
		cb(null, 'upload/' + time);
	}, filename: function (req, file, cb) {
		// 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
		file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
		cb(null, moment.format(new Date(), 'YYYYMMDD') + randomChar(6) + file.originalname.substring(file.originalname.lastIndexOf(".")));
	}
});



// 创建 multer 对象
var upload = multer({ storage });


router.post('/file', upload.single('file'), async function (req, response, next) {
	const time = moment.format(new Date(), 'YYYY')
	const file = req.file;
	const usePath = file.path.substring(7)
	const suffix = file.originalname.substring(file.originalname.lastIndexOf("."))
	const fullPath = (path.resolve(__dirname, '..') + '\\' + file.path).replace(/\\/g, '/')
	console.log(file);
	try {
		await File.create({
			id: uuid(),
			fullPath,
			oldName: file.originalname,
			name: file.filename,
			size: file.size,
			// folder: file.destination,
			path: '/upload/' + time + '/' + file.filename,
			suffix
		})
		response.send(success({
			url: fileUrl + '/' + file.path.replace(/\\/g, '/')
		}))
	} catch (error) {
		response.send(fail(error))
	}
});


/* 收集资料的上传文件 */

/*  参数： 
		gatherName 项目名称,
		student 学号加姓名,
		STUDENT_ID 学生id,
		GATHER_ID  项目id
*/
router.post('/gather/file', multer({ storage: multer.memoryStorage() }).single('file'), function (req, response, next) {
	const { gatherName, student, studentId, gatherId } = req.body
	const file = req.file;
	const suffix = file.originalname.substring(file.originalname.lastIndexOf("."))
	/* 文件存储路径 */
	const savePath = `./upload/university/${gatherName}`
	/* 检测是否存在文件夹 */
	fs.exists(savePath, (exists) => {
		if (!exists) {
			fs.mkdirSync(savePath);
		}
		/* 检测是否存在文件 */
		fs.exists(savePath + `/${student}${suffix}`, (existsFile) => {
			let fileName = ''
			if (!existsFile) {
				fileName = `${student}${suffix}`
			} else {
				fileName = `${student}-${createFileName(6)}${suffix}`
			}
			/* 存文件 */
			fs.writeFile(path.join(savePath, fileName), new Buffer(req.file.buffer), async function (err) {
				if (err) {
					console.log(err)
				}
				/* 做上传成功的业务 */
				try {
					await StudentFile.create({ id: uuid(), gatherId, studentId, suffix })
					let temp = Object.assign({}, file)
					delete temp.buffer
					response.send(success({ ...temp, gatherName, student, studentId, gatherId }))
				} catch (error) {
					response.send(fail(error))
				}
			});
		});
	});
});


module.exports = router;
