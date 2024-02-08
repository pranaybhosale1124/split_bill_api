const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction', {
    transaction_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaction_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    transaction_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    transaction_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    transaction_mode: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
        ]
      },
    ]
  });
};
