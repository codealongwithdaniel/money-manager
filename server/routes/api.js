const router = require('express').Router();
const userController = require('../controllers/user');
const transactionController = require('../controllers/transaction');

//  User routes
router.get('/test', userController.testFn);
router.post('/user/register', userController.registerUser);
router.post('/user/signin', userController.signIn);
//  Transaction routes
router.post('/transaction/add', transactionController.addTransaction);
router.post('/transaction/update', transactionController.updateTransaction);
router.post('/transaction/delete',transactionController.deleteTransaction);

module.exports = router;