const connection  = require('../config/dbConfig');

const transactionController = {

    addTransaction: function(data){
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO transactions SET ?', data, function(err, rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    },

    updateTransaction: function(data){
        return new Promise((resolve, reject)=>{
            connection.query('UPDATE transactions set type = ? , category_id = ?, date = ?, price = ? WHERE id = ?', [data.type,data.category_id,data.date,data.price,data.id], function(err, rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    },

    deleteTransaction: function(id){
        return new Promise((resolve, reject)=>{
            connection.query('DELETE FROM transactions WHERE id = ?', id, function(err, rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    },

    getTransactionById: function(id){
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM transactions WHERE id = ?', id, function(err,rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    },

    getAllTransactionByUserId: function(userId){
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM transactions where user_id = ?', userId, function(err, rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }

}

module.exports = transactionController;