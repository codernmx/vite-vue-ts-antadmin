var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const { execsql } = require('../utils/coon');//数据库操作方法



router.get('/', async (req, response, next) => {
  /* 获取角色 */
  try {
    const sql = `SELECT * FROM menu WHERE parId IS NULL`
    const res = await execsql(sql)
    console.log(res);
    const allUserSql = `SELECT * FROM menu`
    const allUser = await execsql(allUserSql)
    let data = []
    // /* 先通过 父级id分组 拿到它自己 */
    // res.forEach(item => {
    //   data.push(allUser.filter(v => v.id == item.parId)[0])
    // });
    res.forEach(item => {
      item.children = allUser.filter(v => v.parId == item.id)
    });
    response.send({
      data:res,
      code: 200,
      msg: '成功'
    })
  } catch (error) {
    console.log(error, 'err');
    response.send(error)
  }
});


router.get('/del/menu', async (req, response, next) => {
  const { id } = req.query
  /* 获取角色 */
  try {
    const sql = `DELETE FROM menu WHERE id = '${id}'`
    const res = await execsql(sql)
    response.send({
      data: res,
      code: 200,
      msg: '成功'
    })
  } catch (error) {
    console.log(error, 'err');
    response.send(error)
  }
});


router.get('/insert/menu', async (req, response, next) => {
  const { id } = req.query
  /* 获取角色 */
  try {
    const sql = `INSERT INTO menu (id, parId, title, icon, path, name) VALUES ('${createFileName(5)}','${id}','title','icon','path','name')`
    const res = await execsql(sql)
    response.send({
      data: res,
      code: 200,
      msg: '成功'
    })
  } catch (error) {
    console.log(error, 'err');
    response.send(error)
  }
});


/* 修改脚本 */
// router.get('/xiugai', async (req, response, next) => {
//   /* 获取角色 */
//   try {
//     const sql = `SELECT * FROM`
//     const res = await execsql(sql)

//     res.forEach(async item => {
//       console.log(item.name);
//       let q = `UPDATE SET updateTime = NULL WHERE name = '${item.name}'`
//       const res = await execsql(q)
//     });
//     // response.send({
//     //   code: 200,
//     //   msg: '成功'
//     // })
//   } catch (error) {
//     response.send(error)
//   }
// });

function createFileName (length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)]
  return result
}

router.get('/check/file/list', async (req, response, next) => {
  try {
    const dir = 'F:/Desktop/projectName/upload/temp/check'
    fs.readdir(dir, (err, files) => {
      if (err) {
        throw err;
      }
      let fileList = []
      files.forEach(file => {
        fileList.push({
          url: 'http://localhost:3000/upload/temp/check/' + file,
        })
        // let newName = dir + '/' + new Date().getTime() + '_' + createFileName(6) + '.' +file.split('.')[1]
        // fs.rename(dir + '/' + file, newName, (err) => {
        //   if (err) {
        //     console.log('出错')
        //   } else {
        //     console.log('未出错')
        //   }
        // })
      });
      response.send(fileList)
    });
  } catch (error) {
    response.send(error)
  }
});




module.exports = router;
