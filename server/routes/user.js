/*
 * @Date: 2023-06-06 13:05:56
 * @LastEditTime: 2023-06-06 13:08:08
 */
var express = require('express');
var router = express.Router();
const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const { User } = require('../models/index')





/* 获取用户列表 */
router.post('/user/list', async (req, response, next) => {
    const { name, pageSize, pageNum } = req.body
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
    const { id } = req.body
    try {
        const data = await User.findOne({
            where: { id }
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 添加用户 */
router.post('/insert/user', async (req, response, next) => {
    const { title, content, userId, inputValue } = req.body
    try {
        const res = await User.create({ id: uuid(), title, content, userId, inputValue })
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 编辑用户 */
router.post('/update/user', async (req, response, next) => {
    const { id, title, content, inputValue } = req.body
    try {
        const data = await User.update({ title, content, inputValue }, { where: { id } });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 删除用户 */
router.post('/delete/user', async (req, response, next) => {
    const { id } = req.body
    try {
        const data = await User.update({ deleteTime: Sequelize.fn('NOW') }, { where: { id } });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


module.exports = router;
