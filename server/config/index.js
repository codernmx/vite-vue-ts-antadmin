/*
 * @Date: 2023-06-09 09:50:08
 * @LastEditTime: 2023-06-18 12:22:05
 */
// const fileUrl = 'http://localhost:3000'  //文件访问路径 --本地
const fileUrl = 'http://49.232.153.152:9090'  //文件访问路径 --线上
const uploadBase = '/home/project/node/v3-admin/server'  //完整upload路径 --线上

const dbConfig = {
    database: 'bjcx',
    user: 'root',
    password: '137928',
    options: {
        host: '127.0.0.1', //数据库服务器的IP地址或域名
        port: 3306, //数据库使用的端口号。MySQL数据库的默认端口号是3306
        dialect: 'mysql',//数据库的类型
        pool: { //数据库连接池：放若干个数据库的连接对象，提高数据库的访问效率
            max: 20, //数据库连接池中连接对象的最大个数
            min: 3, //数据库连接池中连接对象的最少个数
            idle: 20000 //等待延迟的时间，单位是毫秒
        }, timezone: '+08:00',

        define: {
            timestamps: false, // 关键配置，默认为 true， 修改为 false 即可
            'charset': 'utf8' //处理Mysql中中文字符问题
        }, dialectOptions: {
            dateStrings: true, typeCast: true
        }
    }
}

module.exports = {
    fileUrl,
    dbConfig,
    uploadBase
}