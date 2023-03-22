/* 数据库配置 */
const dbConfig = {
	host: '127.0.0.1',  //新服务器
	user: 'root',
	password: '137928',
	database: 'v3-admin',
	timezone: "08:00",  //(解决时区问题)
	wait_timeout: 28800,
	connect_timeout: 10,
	connectionLimit: 100,
}



module.exports = {
	dbConfig,
}