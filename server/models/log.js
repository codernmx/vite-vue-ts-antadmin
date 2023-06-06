const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "IP地址"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "详细地址"
    },
    action: {
      type: DataTypes.STRING(10240),
      allowNull: true,
      comment: "行为记录"
    },
    http_user_agent: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      comment: "请求头"
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
      comment: "删除时间-Null表示未删除"
    }
  }, {
    sequelize,
    tableName: 'log',
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
