const TransactionModel = require('../models/Transaction');
const { check, validationResult } = require('express-validator');

const transactionController = {
    addTransaction: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({success: false, errors: errors.array() });
        }else{
            const data = {
                type: req.body.type,
                category_id: req.body.category_id,
                date: req.body.date,
                price: req.body.price,
                user_id: req.user_id
            }
            TransactionModel.addTransaction(data)
            .then((results)=>{
                res.json({success: true, message: 'Record added'})
            })
            .catch((error)=>{
                res.json({success: false, message: 'Something went wrong'})
            })
        }
    },

    updateTransaction: function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({success: false, errors: errors.array() });
        }else{
            const data = {
                type: req.body.type,
                category_id: req.body.category_id,
                date: req.body.date,
                price: req.body.price,
                id: req.params.id
            }
            TransactionModel.updateTransaction(data)
            .then((results)=>{
                res.json({success: true, message: 'Record updated'})
            })
            .catch((error)=>{
                res.json({success: false, message: 'Something went wrong'})
            })
        }
    },

    deleteTransaction: function(req, res){
        TransactionModel.deleteTransaction(req.params.id)
        .then((results)=>{
            res.json({success: true, message: 'Record Deleted'})
        })
        .catch((error)=>{
            res.json({success: false, message: 'Something went wrong'})
        })
    }
}

module.exports = transactionController;