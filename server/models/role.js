const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "角色名称"
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "备注"
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
    }
  }, {
    sequelize,
    tableName: 'role',
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
