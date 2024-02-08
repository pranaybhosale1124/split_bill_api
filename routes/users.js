const express = require('express');
const router = express.Router();

const sequelize = require('../models/db-config')
const initModels = require("../models/init-models");
const models = initModels(sequelize);
/* GET users listing. */

router.get('/get-user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await models.user.findByPk(userId);

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
});

router.get('/get-notifications/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find the user by ID
    const user = await models.user.findByPk(userId, {
      include: [
        {
          model: models.notification,
          as: 'notifications',
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
});

router.get('/get-all-users', async (req, res) => {
  try {
    // Find all users
    const users = await models.user.findAll();

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
});

router.post('/add-user', async (req, res) => {
  const userData = req.body;

  try {
    // Create a new user
    const newUser = await models.user.create(userData);

    res.status(200).json({
      status: 200,
      message: 'User added successfully.',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
});



module.exports = router;
