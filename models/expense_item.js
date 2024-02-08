const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('expense_item', {
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'expense',
        key: 'expense_id'
      }
    },
    item_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    item_description: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'expense_item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "expense_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "expense_id" },
        ]
      },
    ]
  });
};
