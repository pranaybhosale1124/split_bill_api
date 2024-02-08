const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group', {
    group_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    group_details: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    group_status: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "Active"
    },
    group_create_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    group_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    group_expense_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    group_total_amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    group_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'group',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
};
