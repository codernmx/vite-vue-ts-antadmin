var mysql = require('mysql');
const { dbConfig } = require('../config/index')
//连接数据库//创建连接
var connection = mysql.createConnection(dbConfig);
//连接数据库
connection.connect();

//避免数据库超时断开
function keepAlive () {
	connection.query('select 1', [], function (err, result) {
		if (err) return console.log(err);
		// Successul keepalive
	});
}
setInterval(keepAlive, 1000 * 60);

//执行语句sql
function execsql (sql) {
	const promise = new Promise((resolve, reject) => {
		connection.query(sql, (err, res) => {
			if (err) {
				reject(err)
				return
			}
			resolve(res)
		})
	})
	return promise
}

module.exports = {
	execsql,
}