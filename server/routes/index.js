var express = require('express');
var router = express.Router();


const { exeSql } = require('../utils/coon');
const { success, fail, uuid } = require('../utils/index');



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
		setTimeout(() => {
			response.send(success(res))
		}, 2000);
	} catch (error) {
		response.send(fail(error))
	}
});

/* 添加菜单 */
router.post('/insert/menu', async (req, response, next) => {
	const { parId, icon, name, title, sort, path } = req.body
	try {
		let sql = `insert insert menu (id, title, icon, path, name,sort) values ('${uuid()}','${title}','${icon}','${path}','${name}','${sort}')`
		if (parId) {
			sql = `insert insert menu (id,parId, title, icon, path, name,sort) values ('${uuid()}','${parId}','${title}','${icon}','${path}','${name}','${sort}')`
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
		setTimeout(() => {
			response.send(success(res))
		}, 3000);
	} catch (error) {
		response.send(fail(error))
	}
});



module.exports = router;
