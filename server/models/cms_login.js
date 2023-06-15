const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cms_login', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "主键id"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "修改时间"
    },
    deleteTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "删除时间"
    },
    userId: {
      type: DataTypes.STRING(33),
      allowNull: false,
      comment: "用户ID"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "登录用户名"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "登录密码"
    }
  }, {
    sequelize,
    tableName: 'cms_login',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
