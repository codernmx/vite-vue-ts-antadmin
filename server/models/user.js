/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    'id': {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    'name': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "账号"
    },
    'password': {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "密码"
    },
    'nickName': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "昵称"
    },
    'createTime': {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    'updateTime': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    },
    'deleteTime': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "删除时间"
    }
  }, {
    tableName: 'user'
  });
};
