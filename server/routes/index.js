var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var jwt = require('../utils/jwt')

const { exeSql } = require('../utils/coon');
const { success, fail, uuid } = require('../utils/index');


const sequelize = require('sequelize')
const seqCoon = require('../utils/sequelize')
const User = require('../models/user')(seqCoon, sequelize)
const Article = require('../models/article')(seqCoon, sequelize)

// 使用模糊查询需要先引入Op
const Op = sequelize.Op;


/* 登录 */
router.post('/login', async (req, response, next) => {
	const { name, password } = req.body
	try {
		const sql = `select * from user where name = '${name}'`
		const res = await exeSql(sql)
		if (res[0]) {
			const sql = `select * from user where name = '${name}' and password = '${md5(password)}'`
			const res = await exeSql(sql)
			if (res[0]) {
				const token = jwt.createToken({ name });
				response.send(success({
					...res[0],
					token
				}))
			} else {
				response.send(fail('账号或者密码错误'))
			}
		} else {
			response.send(fail('账号未注册'))
		}

	} catch (error) {
		response.send(fail(error))
	}
});


router.get('/test/user', async (req, response, next) => {
	try {
		const data = await User.findAll()
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 获取菜单列表 */
router.post('/menu/list', async (req, response, next) => {
	try {
		const sql = 'select * from menu where parId is null'
		const res = await exeSql(sql)
		const allUserSql = 'select * from menu'
		const allUser = await exeSql(allUserSql)
		res.forEach(item => {
			item.children = allUser.filter(v => v.parId == item.id)
		});
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});


/* 删除菜单 */
router.post('/del/menu', async (req, response, next) => {
	const { id } = req.body
	try {
		const sql = `delete from menu where id = '${id}'`
		const res = await exeSql(sql)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 添加菜单 */
router.post('/insert/menu', async (req, response, next) => {
	const { parId, icon, name, title, sort, path } = req.body
	try {
		let sql = `insert into menu (id, title, icon, path, name,sort) values ('${uuid()}','${title}','${icon}','${path}','${name}','${sort}')`
		if (parId) {
			sql = `insert into menu (id,parId, title, icon, path, name,sort) values ('${uuid()}','${parId}','${title}','${icon}','${path}','${name}','${sort}')`
		}
		const res = await exeSql(sql)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});
/* 更新菜单 */
router.post('/update/menu', async (req, response, next) => {
	const { id, icon, name, title, sort, path } = req.body
	try {
		let sql = `update menu set name = '${name}',icon = '${icon}',title = '${title}',path = '${path}',sort = '${sort}' where id = '${id}'`
		const res = await exeSql(sql)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});




/* 获取文章列表 */
router.post('/article/list', async (req, response, next) => {
	const { title, pageSize, pageNum } = req.body
	try {
		let data = await Article.findAndCountAll({
			where: {
				title: {
					[Op.like]: `%${title}%`
				},
			},
			limit: pageSize || 10,
			offset: ((pageNum || 1) - 1) * (pageSize || 10)
		});
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 获取文章详情 */
router.post('/article/details', async (req, response, next) => {
	const { id } = req.body
	try {
		const data = await Article.findOne({ where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});
/* 添加文章 */
router.post('/insert/article', async (req, response, next) => {
	const { title, content, userId } = req.body
	try {
		const res = await Article.create({ id: uuid(), title, content, userId })
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 编辑文章 */
router.post('/update/article', async (req, response, next) => {
	const { id, title, content, inputValue } = req.body
	try {
		let sql = `update article set title = '${title}',content = '${content}',inputValue = '${inputValue}' where id = '${id}'`
		const res = await exeSql(sql)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 删除文章 */
router.post('/delete/article', async (req, response, next) => {
	const { id } = req.body
	try {
		let sql = `update article set deleteTime = now() where id = '${id}'`
		const res = await exeSql(sql)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});




module.exports = router;
