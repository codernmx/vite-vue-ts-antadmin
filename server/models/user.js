const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    parentOpenId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "邀请人openId"
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "用户昵称"
    },
    avatar: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "头像"
    },
    openId: {
      type: DataTypes.STRING(256),
      allowNull: true,
      comment: "openId"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "邮箱号码"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "是否停用：0正常，1禁用"
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
      comment: "更新时间"
    },
    deleteTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "删除时间"
    },
    loginNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "登录次数"
    }
  }, {
    sequelize,
    tableName: 'user',
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
