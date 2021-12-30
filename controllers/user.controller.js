const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');



// @description     Register a new user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async(req, res) => {
    const { firstname, lastname, email, phone, isActive, isAdmin, password, role } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        isActive,
        isAdmin,
        password,
        role
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Admin/ Authenticated Users
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select('-password')
    res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access Admin/ Authenticated Users
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.role = req.body.role || user.role
        user.phone = req.body.phone || user.phone
        user.isActive = req.body.isActive || user.isActive
        user.isAdmin = req.body.isAdmin || user.isAdmin
        user.email = req.body.email || user.email

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isActive: updatedUser.isActive,
            role: updatedUser.role,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Disable user account ie deactivate a user
// @route   PUT /api/users/:id/disable
// @access  Admin
const disableUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isActive == true) {
            user.isActive = false;
            const updatedUser = await user.save()
            res.json({ message: "user has been disabled" })
        } else {
            res.json({ message: "The user is already disabled" })
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            token: generateToken(user._id),
        })
    } else {
        res.status(401).json('Invalid email or password')
            // throw new Error('Invalid email or password')

    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Authenticated user
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Authenticated user
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.phone = req.body.phone || user.phone

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            phone: updatedUser.phone,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


module.exports = {
    getUsers,
    registerUser,
    getUserById,
    updateUser,
    deleteUser,

    disableUser,

    authUser,
    getUserProfile,
    updateUserProfile
}