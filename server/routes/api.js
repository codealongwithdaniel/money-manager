const router = require('express').Router();
const userController = require('../controllers/user');


//  User routes
router.get('/test', userController.testFn);
router.post('/user/register', userController.registerUser);

//  Transaction routes


module.exports = router;