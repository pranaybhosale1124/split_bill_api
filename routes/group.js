const express = require('express');
const router = express.Router();

const sequelize = require('../models/db-config')
const initModels = require("../models/init-models");
const models = initModels(sequelize);

router.get('/get-all-groups', async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const groups = await models.group.findAll({
            include: [
                {
                    model: models.expense,
                    as: 'expenses',
                    include: [{
                        model: models.expense_users, as: 'expense_users',
                        include: [
                            { model: models.user, as: 'user', },
                            { model: models.transaction, as: 'transaction', }],
                    }],
                },
            ],
            transaction: t,
        });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: groups
        });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(200).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
});

router.get('/get-group/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const t = await sequelize.transaction();

    try {
        const group = await models.group.findByPk(groupId, {
            include: [
                {
                    model: models.expense,
                    as: 'expenses',
                    include: [
                        {
                            model: models.expense_users,
                            as: 'expense_users',
                            include: [
                                { model: models.user, as: 'user' },
                                { model: models.transaction, as: 'transaction' },
                            ],
                        },
                    ],
                },
            ],
            transaction: t,
        });

        await t.commit();
        res.status(200).json({
            status: 200,
            message: 'Success',
            data: group,
        });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(200).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});

router.post('/create-group', async (req, res) => {
    const groupData = req.body;
    const t = await sequelize.transaction();
    try {
        // Create group
        const group = await models.group.create(groupData, { transaction: t });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Group created successfully.',
            data: group,
        });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(200).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});

router.put('/update-group/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const updatedGroupData = req.body;
    const t = await sequelize.transaction();

    try {
        // Update the group
        await models.group.update(updatedGroupData, { transaction: t });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Group updated successfully.',
            data: group,
        });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(200).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;
