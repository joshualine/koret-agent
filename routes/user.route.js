const {
    authUser,
    getUserProfile,
    updateUserProfile,

    getUsers,
    registerUser,
    getUserById,
    updateUser,
    deleteUser,
    disableUser
} = require('../controllers/user.controller');
const router = require("express").Router();
const { protected, admin } = require('../middlewares/auth.middleware');

//---------------------------------------------------------------------------

router.route('/')
    .get(protected, getUsers) //Get All Users
    .post(protected, registerUser); //Add User

router
    .post('/login', authUser)

//---------------------------------------------------------------------------
router
    .route('/profile')
    .get(protected, getUserProfile) //Get user profile
    .put(protected, updateUserProfile) //Update User profile

//---------------------------------------------------------------------------
router
    .route('/:id')
    .get(protected, getUserById) //Get One User 
    .put(protected, admin, updateUser) //Update User 
    .delete(protected, admin, deleteUser) //Delete User

//--------------------------------------------------------------------------
router
    .route('/:id/disable')
    .put(protected, admin, disableUser); //admin Disable a User account



module.exports = router;