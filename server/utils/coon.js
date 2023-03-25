var mysql = require('mysql');
const { dbConfig } = require('../config/index')
const pool = mysql.createPool(dbConfig);
//执行语句sql
function exeSql (sql) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (errConn, conn) {
			if (errConn) {
				console.log("数据库连接失败", errConn);
				reject(errConn)
			} else {
				conn.query(sql, function (errQuery, result) {
					if (errQuery) {
						console.log("数据库查询失败",errQuery);
						reject(errQuery)
					} else {
						resolve(result)
						conn.release();
					}
				})
			}
		})
	})
}

module.exports = {
	exeSql,
}