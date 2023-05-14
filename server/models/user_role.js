const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户id"
    },
    roleId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "角色id"
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
    }
  }, {
    sequelize,
    tableName: 'user_role',
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
