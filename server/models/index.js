const coon = require('../utils/sequelize')
const { Sequelize } = require("sequelize");


const User = require('./user')(coon, Sequelize)
const Article = require('./article')(coon, Sequelize)
const Menu = require('./menu')(coon, Sequelize)
const File = require('./file')(coon, Sequelize)
const Role = require('./role')(coon, Sequelize)
const RoleMenu = require('./role_menu')(coon, Sequelize)
const UserRole = require('./user_role')(coon, Sequelize)

module.exports = {
    User, Article, Menu, File, Role, RoleMenu, UserRole
};
