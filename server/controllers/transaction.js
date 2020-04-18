const TransactionModel = require('../models/Transaction');
const { check, validationResult } = require('express-validator');
const icons = require('../json/data');
const _ = require('lodash');

function returnIconNames(iconObj){
    return iconObj.name;
}

function getRandomRgb(el) {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    // return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    el.colorCode = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    el.colorAlpha = 'rgb(' + r + ', ' + g + ', ' + b + ', 0.2)';
    return el
}

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
                user_id: req.user.user_id
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

    getMonthWiseTransaction: function(req, res){
        const dateObj = {
            month: req.body.date.split('-')[1],
            year: req.body.date.split('-')[0]
        }
        
        TransactionModel.getAllTransactionWithDateAndUserId(dateObj, req.user.user_id)
        .then((results)=>{
            res.json({success: true, results: results});
        })
        
        .catch((error)=>{
            res.json({success: false, message: 'Something went wrong'});
        })
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
    },

    getIcons: function(req, res){
        res.send(_.map(icons, returnIconNames));
    },

    getChartData: function(req, res){
        const dateObj = {
            month: req.body.date.split('-')[1],
            year: req.body.date.split('-')[0]
        }
        TransactionModel.chartData('expense', dateObj, req.user.user_id)
        .then((expenseGrouped)=>{
            TransactionModel.chartData('income', dateObj, req.user.user_id)
            .then((incomeGrouped)=>{
                res.json({success: true, results: {expenseChart: _.flatMap(expenseGrouped, getRandomRgb), incomeChart: _.flatMap(incomeGrouped, getRandomRgb)}});
            })
            .catch((err)=>{
                console.log(err);
                res.json({success: false, message: 'Something went wrong'})
            })
        })
        .catch((err)=>{
            console.log(err);
            res.json({success: false, message: 'Something went wrong'});
        })
    }
}

module.exports = transactionController;