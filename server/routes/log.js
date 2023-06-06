/*
 * @Date: 2023-06-06 13:05:56
 * @LastEditTime: 2023-06-06 13:28:11
 */
var express = require('express');
var router = express.Router();
const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const { Log } = require('../models/index')





/* 获取日志列表 */
router.post('/log/list', async (req, response, next) => {
    const { action, pageSize, pageNum } = req.body
    try {
        let data = await Log.findAndCountAll({
            where: {
                action: {
                    [Op.like]: `%${action || ''}%`,
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



/* 获取日志详情 */
router.post('/log/details', async (req, response, next) => {
    const { id } = req.body
    try {
        const data = await Log.findOne({
            where: { id }
        });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 添加日志 */
router.post('/insert/log', async (req, response, next) => {
    const { title, content, logId, inputValue } = req.body
    try {
        const res = await Log.create({ id: uuid(), title, content, logId, inputValue })
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 编辑日志 */
router.post('/update/log', async (req, response, next) => {
    const { id, title, content, inputValue } = req.body
    try {
        const data = await Log.update({ title, content, inputValue }, { where: { id } });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 删除日志 */
router.post('/delete/log', async (req, response, next) => {
    const { id } = req.body
    try {
        const data = await Log.update({ deleteTime: Sequelize.fn('NOW') }, { where: { id } });
        response.send(success(data))
    } catch (error) {
        response.send(fail(error))
    }
});


module.exports = router;
