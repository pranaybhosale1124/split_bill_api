
const express = require('express');
const router = express.Router();

const sequelize = require('../models/db-config')
const initModels = require("../models/init-models");
const models = initModels(sequelize);


router.get('/get-all-expenses-by-user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const t = await sequelize.transaction();

    try {
        // Find all expenses associated with the user
        const expenses = await models.expense_users.findAll({
            where: { user_id: userId },
            include: [
                { model: models.expense, as: 'expense' }
            ],
            transaction: t,
        });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: expenses,
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

router.get('/get-expense/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;
    const t = await sequelize.transaction();

    try {
        // Find the expense by ID with associated expense items and users
        const expense = await models.expense.findByPk(expenseId, {
            include: [
                { model: models.expense_item, as: 'expense_items' },
                { model: models.expense_users, as: 'expense_users' },
            ],
            transaction: t,
        });

        if (!expense) {
            await t.rollback();
            return res.status(404).json({
                status: 404,
                message: 'Expense not found.',
            });
        }

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: expense,
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

router.get('/get-group-expenses/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const t = await sequelize.transaction();

    try {
        // Find the group by ID with associated expenses, expense items, and users
        const group = await models.group.findByPk(groupId, {
            include: [
                {
                    model: models.expense,
                    as: 'expenses',
                    include: [
                        { model: models.expense_item, as: 'expense_items' },
                        { model: models.expense_users, as: 'expense_users' },
                    ],
                },
            ],
            transaction: t,
        });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: group.expenses,
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

router.post('/create-expense', async (req, res) => {
    const expenseData = req.body;
    const t = await sequelize.transaction();
    try {
        // Create an expense
        const expense = await models.expense.create(expenseData,{
            transaction: t
        });

        res.status(200).json({
            status: 200,
            message: 'Expense created successfully.',
            data: expense,
        });
        
        await t.commit();

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(200).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
});

router.put('/update-expense/:expenseId', async (req, res) => {
    const expenseId = req.params.expenseId;
    const updatedExpenseData = req.body;
    const t = await sequelize.transaction();
    try {
        // Update the expense
        await models.expense.update(updatedExpenseData, {
            where: { expense_id: expenseId },
            transaction: t
        });

        await t.commit();

        res.status(200).json({
            status: 200,
            message: 'Expense updated successfully.',
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