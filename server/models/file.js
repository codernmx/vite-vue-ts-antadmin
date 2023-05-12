const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      comment: "主键id"
    },
    oldName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件原名称"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件存储名称"
    },
    suffix: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件后缀名"
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "文件大小"
    },
    folder: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件夹"
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件路径"
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
    fullPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "完整路径"
    }
  }, {
    sequelize,
    tableName: 'file',
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
