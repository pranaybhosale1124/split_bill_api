var DataTypes = require("sequelize").DataTypes;
var _expense = require("./expense");
var _expense_item = require("./expense_item");
var _expense_users = require("./expense_users");
var _group = require("./group");
var _notification = require("./notification");
var _transaction = require("./transaction");
var _user = require("./user");

function initModels(sequelize) {
  var expense = _expense(sequelize, DataTypes);
  var expense_item = _expense_item(sequelize, DataTypes);
  var expense_users = _expense_users(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  expense_item.belongsTo(expense, { as: "expense", foreignKey: "expense_id"});
  expense.hasMany(expense_item, { as: "expense_items", foreignKey: "expense_id"});
  expense_users.belongsTo(expense, { as: "expense", foreignKey: "expense_id"});
  expense.hasMany(expense_users, { as: "expense_users", foreignKey: "expense_id"});
  notification.belongsTo(expense, { as: "expense", foreignKey: "expense_id"});
  expense.hasMany(notification, { as: "notifications", foreignKey: "expense_id"});
  expense.belongsTo(group, { as: "group", foreignKey: "group_id"});
  group.hasMany(expense, { as: "expenses", foreignKey: "group_id"});
  expense_users.belongsTo(transaction, { as: "transaction", foreignKey: "transaction_id"});
  transaction.hasMany(expense_users, { as: "expense_users", foreignKey: "transaction_id"});
  expense.belongsTo(user, { as: "creator_user", foreignKey: "creator_user_id"});
  user.hasMany(expense, { as: "expenses", foreignKey: "creator_user_id"});
  expense_users.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(expense_users, { as: "expense_users", foreignKey: "user_id"});
  notification.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(notification, { as: "notifications", foreignKey: "user_id"});

  return {
    expense,
    expense_item,
    expense_users,
    group,
    notification,
    transaction,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
