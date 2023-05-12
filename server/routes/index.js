var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var jwt = require('../utils/jwt')

const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const { User, Article, Menu, File } = require('../models/index')


// // belongsTo 谁属于一个谁 / 一本书属于一个人
Article.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });
// hasOne 谁拥有一个谁 / 一个人拥有一本书
// User.hasOne(Article, {foreignKey: 'userId',sourceKey: 'id'});

/* 登录 */
router.post('/login', async (req, response, next) => {
	const { name, password } = req.body
	try {
		const data = await User.findOne({ where: { name } });
		if (data) {
			const login = await User.findOne({ attributes: ['id', 'name', 'nickName'], where: { name, password: md5(password) } });
			if (login) {
				const token = jwt.createToken({ name });
				response.send(success({
					...login.get(),
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


/* 获取菜单列表 */
router.post('/menu/list', async (req, response, next) => {
	try {
		let res = await Menu.findAll({
			where: {
				parId: null
			},
			raw: true
		});
		let allUser = await Menu.findAll({ raw: true });
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
		const data = await Menu.destroy({ where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 添加菜单 */
router.post('/insert/menu', async (req, response, next) => {
	const { parId, icon, name, title, sort, path } = req.body
	try {
		if (parId) {
			await Menu.create({ id: uuid(), parId, icon, name, title, sort, path })
		} else {
			await Menu.create({ id: uuid(), icon, name, title, sort, path })
		}
		response.send(success())
	} catch (error) {
		response.send(fail(error))
	}
});
/* 更新菜单 */
router.post('/update/menu', async (req, response, next) => {
	const { id, icon, name, title, sort, path } = req.body
	try {
		const data = await Menu.update({ icon, name, title, sort, path }, { where: { id } });
		response.send(success(data))
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
					[Op.like]: `%${title || ''}%`,
				},
				deleteTime: null
			},
			order: [['createTime', 'desc']],
			limit: pageSize || 10,
			offset: ((pageNum || 1) - 1) * (pageSize || 10),
			include: [{ model: User }]
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
		await Article.update({
			views: literal("views + 1"),
			// readCount  : literal("read_count + 1"),  // 这里有个坑注意大小写
		}, { where: { id } });
		const data = await Article.findOne({
			include: [{ model: User }],
			where: { id }
		});
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});
/* 添加文章 */
router.post('/insert/article', async (req, response, next) => {
	const { title, content, userId, inputValue } = req.body
	try {
		const res = await Article.create({ id: uuid(), title, content, userId, inputValue })
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 编辑文章 */
router.post('/update/article', async (req, response, next) => {
	const { id, title, content, inputValue } = req.body
	try {
		const data = await Article.update({ title, content, inputValue }, { where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 删除文章 */
router.post('/delete/article', async (req, response, next) => {
	const { id } = req.body
	try {
		const data = await Article.update({ deleteTime: Sequelize.fn('NOW') }, { where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});






/* 附件 */
/* 获取列表 */

router.post('/file/list', async (req, response, next) => {
	const { title, pageSize, pageNum } = req.body
	try {
		let data = await File.findAndCountAll({
			where: {
				name: {
					[Op.like]: `%${title || ''}%`,
				},
				deleteTime: null
			},
			order: [['createTime', 'desc']],
			limit: pageSize || 10,
			offset: ((pageNum || 1) - 1) * (pageSize || 10),
		});
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 删除 */
router.post('/del/file', async (req, response, next) => {
	const { id } = req.body
	try {
		const data = await File.destroy({ where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});


/* 更新菜单 */
router.post('/update/file', async (req, response, next) => {
	const { id, icon, name, title, sort, path } = req.body
	try {
		const data = await File.update({ icon, name, title, sort, path }, { where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 附件  结束 */


module.exports = router;
