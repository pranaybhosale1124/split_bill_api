const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    notification_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    notification_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    notification_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'expense',
        key: 'expense_id'
      }
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
      {
        name: "expense_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "expense_id" },
        ]
      },
      {
        name: "user_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
