const router = require('express').Router();
const userController = require('../controllers/user');
const transactionController = require('../controllers/transaction');
const categoryController = require('../controllers/category');

const auth = require('../config/authConfig');
const validations = require('../validations/allValidations');
//  User routes
// router.get('/test', userController.testFn);
router.post('/user/register', validations.register, userController.registerUser);
router.post('/user/login', validations.signIn,userController.signIn);

//  Transaction routes
router.post('/transaction/add', auth,transactionController.addTransaction);
router.post('/transaction/getAll', auth, transactionController.getMonthWiseTransaction);
router.post('/transaction/update', auth,transactionController.updateTransaction);
router.post('/transaction/delete',auth,transactionController.deleteTransaction);
router.post('/transaction/getChartData', auth, transactionController.getChartData);
router.get('/icons/getIcons', transactionController.getIcons);

//  Category routes
router.post('/category/dump', categoryController.dumpCategories);
router.post('/category/add', auth,categoryController.addCategory);
router.get('/category/getAll', categoryController.getAllCategories);
module.exports = router;