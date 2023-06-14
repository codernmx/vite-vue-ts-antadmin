/*
 * @Date: 2023-06-06 13:05:56
 * @LastEditTime: 2023-06-06 13:08:08
 */
var express = require('express');
var router = express.Router();
const {success, fail, uuid} = require('../utils/index');
const {literal, Op, Sequelize} = require("sequelize");
const {User} = require('../models/index')


/* 获取用户列表 */
router.post('/user/list', async (req, response, next) => {
    const {name, pageSize, pageNum} = req.body
    try {
        let data = await User.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${name || ''}%`,
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


/* 获取用户详情 */
router.post('/user/details', async (req, response, next) => {
    const {id} = req.body
    try {
        const data = await User.findOne({
            where: {id}
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 添加用户 */
router.post('/insert/user', async (req, response, next) => {
    const {title, content, userId, inputValue} = req.body
    try {
        const res = await User.create({id: uuid(), title, content, userId, inputValue})
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 编辑用户 */
router.post('/update/user', async (req, response, next) => {
    const {id} = req.body
    const params = {...req.body}
    // 这里有点问题  会影响 loginTime
    try {
        const data = await User.update({...params}, {where: {id}});
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 删除用户 */
router.post('/delete/user', async (req, response, next) => {
    const {id} = req.body
    try {
        const data = await User.update({deleteTime: Sequelize.fn('NOW')}, {where: {id}});
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

// 获取邀请了用户的列表（没做分页）
router.get('/user/list/have/children', async (req, response, next) => {
    const pageNum  = Number(req.query.pageNum)
    const pageSize  = Number(req.query.pageSize)
    try {
        // const sql = `SELECT * FROM user WHERE parentOpenId IS NOT NULL GROUP BY parentOpenId ORDER BY createTime DESC`
        const res = await User.findAndCountAll({
            where: {
                parentOpenId: {
                    [Op.not]: null
                }, //bug
            },
            order: [['createTime', 'desc']],
            group: 'parentOpenId',
            limit: pageSize || 10,
            offset: ((pageNum || 1) - 1) * (pageSize || 10),
            raw: true,
        });
        const allUser = await User.findAll({ raw: true });
        let data = []
        /* 先通过 父级id分组 拿到它自己 */
        res.rows.forEach(item => {
            if (allUser.filter(v => v.openId == item.parentOpenId)) {
                data.push(allUser.filter(v => v.openId == item.parentOpenId)[0])
            }
        });
        data.forEach(item => {
            item.children = allUser.filter(v => v.parentOpenId == item.openId)
        });
        response.send(success({
            count: res.count.length, rows: data
        }))
    } catch (error) {
        response.send(fail(error))
    }
});


module.exports = router;
