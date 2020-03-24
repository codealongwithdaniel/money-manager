const connection  = require('../config/dbConfig');

const categoryController = {
    addCategory: function(data){
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO categories SET ?', data, function(err, rows){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    },

    updateCategory: function(data){
        return new Promise((resolve, reject)=>{
            connection.query('UPDATE transactions set type = ? , name = ?, icon_name = ? WHERE id = ?', [data.type,data.name,data.icon_name,data.id], function(err, rows){
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

module.exports = categoryController;