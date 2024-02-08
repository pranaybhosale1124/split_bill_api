const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expense_users', {
    expense_users_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'expense',
        key: 'expense_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'transaction',
        key: 'transaction_id'
      }
    }
  }, {
    sequelize,
    tableName: 'expense_users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "expense_users_id" },
        ]
      },
      {
        name: "expense_id_map_fk_idx",
        using: "BTREE",
        fields: [
          { name: "expense_id" },
        ]
      },
      {
        name: "user_id_map_fk_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "transaction_id_exp_fk__idx",
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
        ]
      },
    ]
  });
};
