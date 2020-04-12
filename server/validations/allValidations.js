const { check, validationResult } = require('express-validator');

module.exports = {
    register:[
        check('email').isEmail().withMessage('Enter a valid email'),
        check('password').isLength({min: 5}).withMessage('Password should be more than 5 letters'),
        check('name').isLength({min: 5}).withMessage('Password should be more than 5 letters')
    ],
    signIn:[
        check('email').isEmail().withMessage('Enter a valid email'),
        check('password').isLength({min: 5}).withMessage('Password should be more than 5 letters'),
    ],
    addTransaction:[
        check('type').isIn(['Expense', 'Income']).withMessage('Should be Income or Expense'),
        check('category_id').isInt().withMessage('Should be an integer'),
        check('date').isISO8601().toDate(),
        check('price').isInt().isLength({max: 8}).withMessage('Maximum 8 characters allowed')
    ],
    updateTransaction:[
        check('type').isIn(['Expense', 'Income']).withMessage('Should be Income or Expense'),
        check('category_id').isInt().withMessage('Should be an integer'),
        check('date').isISO8601().toDate(),
        check('price').isInt().isLength({max: 8}).withMessage('Maximum 8 characters allowed')
    ]
}