const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "user_name_UNIQUE"
    },
    user_first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "user"
    },
    user_contact_numer: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "user_contact_numer_UNIQUE"
    },
    user_trust_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "user_contact_numer_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_contact_numer" },
        ]
      },
    ]
  });
};
