var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
var jwt = require('../utils/jwt')

const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const { User, Article, Menu, File, Role, RoleMenu, UserRole } = require('../models/index')


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
			//暂时不做邮件登录
			// 所有数据库存在的都成功
			const token = jwt.createToken({ name });
			const userInfo = await User.findOne({ raw: true, where: { name } });
			response.send(success({
				...userInfo,
				token
			}))

			return false

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
	const { id } = req.body   //用户id  如果有id需要根据 角色返回菜单
	try {
		let allMenu = await Menu.findAll({ raw: true });
		let oneLev = await Menu.findAll({
			where: { parId: null },
			raw: true
		});
		if (id) {
			const data = await UserRole.findOne({ raw: true, where: { userId: id } }); //这里后期需要取最优角色 或者可以多选 //目前仅做单选
			// console.log(data.roleId);
			// 根据角色id查询 菜单
			if (!data) {
				response.send(fail('未分配角色，请联系管理员~'))
				return
			}

			let res = await RoleMenu.findAll({
				where: {
					roleId: data.roleId
				},
				raw: true
			});

			let temp = []
			res.forEach(item => {
				temp.push(allMenu.filter(v => v.id == item.menuId)[0])
			})


			let levPar = []
			temp.forEach(item => {
				if (!item.parId) {
					levPar.push(item)
				}
			})

			levPar.forEach(item => {
				item.children = temp.filter(v => v.parId == item.id)
			})

			response.send(success(levPar))
		} else {
			oneLev.forEach(item => {
				item.children = allMenu.filter(v => v.parId == item.id)
			});
			response.send(success(oneLev))
		}


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








/* ----------------用户角色相关------------------ */


// 角色列表
router.post('/role/list', async (req, response, next) => {
	const { title, pageSize, pageNum } = req.body
	try {
		let allMenu = await RoleMenu.findAll({
			// attributes: ['menuId'],
			raw: true
		});


		let data = await Role.findAndCountAll({
			where: {
				name: {
					[Op.like]: `%${title || ''}%`,
				},
				deleteTime: null
			},
			raw: true,
			order: [['createTime']],
			limit: pageSize || 10,
			offset: ((pageNum || 1) - 1) * (pageSize || 10),
		});
		data.rows.forEach(item => {
			let temp = []
			allMenu.filter(v => v.roleId == item.id).forEach(i => {
				temp.push(i.menuId)
			})
			item.menuId = temp
		})
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

/* 删除角色 */
router.post('/del/role', async (req, response, next) => {
	const { id } = req.body
	try {
		const data = await Role.destroy({ where: { id } });
		response.send(success(data))
	} catch (error) {
		response.send(fail(error))
	}
});

// 新增角色
router.post('/insert/role', async (req, response, next) => {
	const { name, remarks } = req.body
	try {
		const res = await Role.create({ id: uuid(), name, remarks })
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});


// 修改角色权限
router.post('/insert/role/menu', async (req, response, next) => {
	const { menuList, roleId } = req.body
	try {
		menuList.forEach(item => { item.id = uuid() });
		const del = await RoleMenu.destroy({ where: { roleId } });
		const res = await RoleMenu.bulkCreate(menuList)
		response.send(success(res))
	} catch (error) {
		response.send(fail(error))
	}
});
/* ----------------用户角色相关  end------------------ */

module.exports = router;
