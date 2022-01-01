const Transaction = require('../models/transactions.model');
const asyncHandler = require('express-async-handler');

// @description     Create new transaction -----------
// @route           POST /api/transactions/deposits
// @access          Authenticated User/ Admin
const makeDeposit = asyncHandler(async(req, res) => {
    const {
        deposit,
    } = req.body

    const transaction = new Transaction({
        user: req.user._id,
        deposit,
    })

    const createdTransaction = await transaction.save()
    res.status(201).json(createdTransaction)
})

// @description     Make a withdrawal
// @route           POST /api/transactions/deposits
// @access          Authenticated User/ Admin
const makeWithdrawal = asyncHandler(async(req, res) => {
    const {
        withdraw,
    } = req.body

    const transaction = new Transaction({
        user: req.user._id,
        withdraw,
    })

    const createdTransaction = await transaction.save()
    res.status(201).json(createdTransaction)
})

// @description     Make a Transfer
// @route           POST /api/transactions/transfers
// @access          Authenticated User/ Admin
const makeTransfer = asyncHandler(async(req, res) => {
    const {
        transfer,
    } = req.body

    const transaction = new Transaction({
        user: req.user._id,
        transfer,
    })
    const createdTransaction = await transaction.save()
    res.status(201).json(createdTransaction)

})

// @desc    Get all Transactions made by a specified user
// @route   GET /api/transactions
// @access  Authenticated user/Admin
const getTransactions = asyncHandler(async(req, res) => {
    const transaction = await Transaction.find({ user: req.user._id })
        // .populate('user', 'firstname')
    if (transaction == "") {
        res.status(404).json('you have not performed any transaction on this account yet')
    } else {
        res.json(transaction)
    }
})

// @desc    Get a transaction by ID
// @route   GET /api/transactions/:id
// @access  Authenticated user/admin
const getTransactionById = asyncHandler(async(req, res) => {
    const transaction = await Transaction.findById(req.params.id).populate(
            'user',
            'firstname lastname'
        )
        // .populate('amount transactionTime').select('user transaction')

    if (transaction) {
        res.json(transaction)
    } else {
        res.status(404)
        throw new Error('transaction not found')
    }
})

// @desc    Reverse a transaction by admin
// @route   GET /api/transactions/:id
// @access  admin
const reverseTransfer = asyncHandler(async(req, res) => {
    const transaction = await Transaction.findById(req.params.id)

    if (transaction) {
        await transaction.remove()
        res.json('Transfer reversed')
    } else {
        res.status(404).json('transfer not found')
        throw new Error('transfer not found')
    }
})



module.exports = {
    makeDeposit,
    makeWithdrawal,
    makeTransfer,
    getTransactions,
    getTransactionById,
    reverseTransfer,
}