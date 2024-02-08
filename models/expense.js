const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expense', {
    expense_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    expense_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'group',
        key: 'group_id'
      }
    },
    creator_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    user_type: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "payer"
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    amount_payment_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    expense_description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    expense_created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expense_settled_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'expense',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "expense_id" },
        ]
      },
      {
        name: "group_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
      {
        name: "user_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "creator_user_id" },
        ]
      },
    ]
  });
};
