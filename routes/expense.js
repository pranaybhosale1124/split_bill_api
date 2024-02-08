
const express = require('express');
const router = express.Router();

const sequelize=require('../models/db-config')
const initModels = require("../models/init-models");
const models = initModels(sequelize);

module.exports = router;