/*
 * @Date: 2023-06-09 09:50:08
 * @LastEditTime: 2023-06-15 23:16:02
 */
const coon = require('../utils/sequelize')
const { Sequelize } = require("sequelize");


const User = require('./user')(coon, Sequelize)
const CmsLogin = require('./cms_login')(coon, Sequelize)
const Article = require('./article')(coon, Sequelize)
const Menu = require('./menu')(coon, Sequelize)
const File = require('./file')(coon, Sequelize)
const Role = require('./role')(coon, Sequelize)
const Log = require('./log')(coon, Sequelize)
const Gather = require('./gather')(coon, Sequelize)
const Student = require('./student')(coon, Sequelize)
const StudentFile = require('./student_file')(coon, Sequelize)
const RoleMenu = require('./role_menu')(coon, Sequelize)
const UserRole = require('./user_role')(coon, Sequelize)

module.exports = {
    User, Article, Menu, File, Role, RoleMenu,CmsLogin,
    UserRole, Log, Gather, Student,  StudentFile
};
