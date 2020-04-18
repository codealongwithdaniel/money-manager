const CategoryModel = require('../models/Category');
const _ = require('lodash');
const categoryController = {
    
    dumpCategories: function(req, res){
        req.body.forEach((category)=>{
            const newCategory = {
                type: 'expense',
                name: category.name,
                icon_name: category.iconName,
                user_id: null
            }
            CategoryModel.addCategory(newCategory)
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.log(error);
            })
        })
    },

    getAllCategories: function(req, res){
        CategoryModel.getAllCategories()
        .then((rows)=>{
            res.json({success: true, results:{income: _.filter(rows, function(obj){return obj.type == 'income'}), expense: _.filter(rows, function(obj){return obj.type == 'expense'})}})
        })
    },


    addCategory: function(req, res){
        const newCategory = {
            type: req.body.type,
            name: req.body.name,
            icon_name: req.body.icon_name,
            user_id: req.user.user_id
        }
        CategoryModel.addCategory(newCategory)
        .then((result)=>{
            // console.log(result);
            res.json({success: true, message: 'New category added'})
        })
        .catch((error)=>{
            res.json({success: false, message: 'Something went wrong'});

        })
    },
}

module.exports = categoryController;