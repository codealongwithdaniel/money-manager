const connection  = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const saltrounds = 10;

const userModel = {
    
    addUser: function(userData, callback){
        connection.query('INSERT INTO users set ?', userData, function(err, rows){
            callback(err, rows);
        })
    },

    checkUserExists: function(email, callback){
        connection.query('SELECT * FROM users where email = ?', email, function(err, rows){
            //  rows is an array 
            if(rows.length){
                //  Rows will be more than zero
                callback(true, err);
            }else{
                callback(false, err);
            }
        })
    },

    hashPassword: function(password, callback){
        bcrypt.hash(password, saltrounds, function(err, hashedPassword){
            callback(err, hashedPassword);
        })
    },

    comparePasswords: function(password, hashedPassword, callback){
        bcrypt.compare(password, hashedPassword, function(err, res) {
            // res is true if the both matches - password and hashed password
            callback(err, res);
        });
    },

    getUserByEmail: function(email, callback){
        connection.query('SELECT * FROM users where email = ?', email, function(err, rows){
            if(rows.length){
                // rows is an array [0] - contains the user

                callback(err, rows[0]);
            }else{
                callback(err, null);
            }
        })
    }

}

module.exports = userModel;