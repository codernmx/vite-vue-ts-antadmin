const { v4: uuidv4 } = require('uuid');



//code  生成附件名称（随机字符串）
function randomChar (length) {
	var str = '0123456789'
	var result = ''
	for (var i = length; i > 0; --i)
		result += str[Math.floor(Math.random() * str.length)]
	return result
}

//成功返回参数
function success (data = null) {
	return {
		code: 200,
		data,
		msg: '成功',
		timestamp: new Date().getTime()
	}
}

//失败参数
function fail (msg = '内部错误') {
	return {
		code: 500,
		msg: msg.toString(),
		timestamp: new Date().getTime()
	}
}

// uuid

function uuid () {
	return uuidv4().replace(/-/g, '')
}

module.exports = {
	success,
	fail,
	randomChar,
	uuid
}