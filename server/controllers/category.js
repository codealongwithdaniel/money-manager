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
    }
}

module.exports = categoryController;