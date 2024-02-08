const express = require('express');
const router = express.Router();

const sequelize=require('../models/db-config')
const initModels = require("../models/init-models");
const models = initModels(sequelize);
/* GET users listing. */

router.get('/', function(req, res, next) {
  
  models.group.findAll({
    include: [
      {model:models.expense, as: 'expenses',
      include:[
        {model:models.expense_users, as: 'expense_users',
        include:[
          {model:models.user, as: 'user'}
        ]}
      ]
    },
      
    ]
  })
  .then(records => {
    console.log(records);
    res.status(200).json({
      status:200,
      data:records
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});




module.exports = router;
