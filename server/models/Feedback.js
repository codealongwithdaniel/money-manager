const connection  = require('../config/dbConfig');

const feedbackController = {
    addFeedback: function(data){
        return new Promise((resolve, reject)=>{
            connection.query('INSERT INTO feedbacks SET ?', data, function(err, rows){
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

module.exports = feedbackController;