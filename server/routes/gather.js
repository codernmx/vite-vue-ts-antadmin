/*
 * @Date: 2023-06-06 13:05:56
 * @LastEditTime: 2023-06-15 23:23:30
 */
var express = require('express');
var router = express.Router();
const { success, fail, uuid } = require('../utils/index');
const { literal, Op, Sequelize } = require("sequelize");
const { Gather, Student, StudentFile } = require('../models/index')
const compressing = require('compressing');
var fs = require('fs'); //文件
const { fileUrl } = require('../config/index')

// 关联模型
Student.hasMany(StudentFile, { foreignKey: 'studentId' });
StudentFile.belongsTo(Student, { foreignKey: 'studentId' });



/* 所有学生列表 */
router.get('/student/list', async (req, response, next) => {
    try {
        const res = await Student.findAll({
            where: { remarks: null }
        })
        response.send(success(res));
    } catch (error) {
        response.send(fail(error))
    }
});


/* 项目列表 */
router.get('/gather/list', async (req, response, next) => {
    const { all } = req.query
    const pageNum = Number(req.query.pageNum)
    const pageSize = Number(req.query.pageSize)
    let res = null
    try {
        res = await Gather.findAll({
            where: { deleteTime: null },
        })
        if (all === '1') {
            res = await Gather.findAndCountAll({
                order: [['createTime', 'desc']],
                limit: pageSize || 10,
                offset: ((pageNum || 1) - 1) * (pageSize || 10),
            })
        }
        response.send(success(res));
    } catch (error) {
        response.send(fail(error))
    }
});


/* 查询已经上传的学生 */
router.get('/already/upload/list', async (req, response, next) => {
    const { id } = req.query
    /* 关联查询根据学号分组（避免一个人传多个文件） */
    // const sql = `SELECT * FROM student JOIN student_file ON student_file.studentId = student.id WHERE student_file.gatherId = '${id}' GROUP BY student.number ORDER BY student.number`
    // 执行查询
    try {
        if (!id) {
            response.send(fail('gatherId为空~'))

        }
        const res = await StudentFile.findAll({
            where: { gatherId: id },
            include: [{
                model: Student,
            }],
            group: ['studentId'],
            // order: [['createTime', 'desc']],
        });
        response.send(success(res));
    } catch (error) {
        response.send(fail(error))
    }
});


/* 删除项目（软删除） */
router.post('/gather/delete', async (req, response, next) => {
    const { id } = req.body
    try {
        const res = await Gather.update({ deleteTime: Sequelize.fn('NOW') }, { where: { id } });
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});

/* 新增收集项目 */
router.post('/gather/insert', async (req, response, next) => {
    const { name, remarks } = req.body
    try {
        const res = await Gather.create({ id: uuid(), name, remarks })
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 修改收集项目 */
router.post('/gather/update', async (req, response, next) => {
    const { id, name, remarks } = req.body
    try {
        const res = await Gather.update({ name, remarks }, { where: { id } });
        response.send(success(res))
    } catch (error) {
        response.send(fail(error))
    }
});


/* 压缩文件夹 */
router.post('/compressing/file', async (req, response, next) => {
    const { folderName } = req.body
    const filePath = `./upload/university/${folderName}`
    compressing.zip.compressDir(filePath, `./upload/university/${folderName}.zip`)
        .then((res) => {
            response.send(success(`${fileUrl}/university/${folderName}.zip`))
        })
        .catch((error) => {
            /* 失败会生成一个破损文件删掉~ */
            fs.unlink(`./upload/university/${folderName}.zip`, function (err) {
                if (err) {
                    return false;
                }
                response.send(fail(error))
            })

        });
});
module.exports = router;
