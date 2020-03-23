const UserModel = require('../models/User');

const userController = {

    testFn: function(req, res){
        res.send('Im working again from test controller');
    },

    registerUser: function(req, res){
        UserModel.checkUserExists(req.body.email, function(isPresent, err){
            if(err){
                console.log(err);
                res.json({success: false, message: "Something went wrong"});
            }else if(isPresent){
                res.json({success: false, message: 'User already exists'});
            }else{
                UserModel.hashPassword(req.body.password, function(hashErr, hashedPassword){
                    if(hashErr){
                        console.log(hashErr);
                        res.json({success: false, message: "Something went wrong"});
                    }else{
                        let userData = {
                            email: req.body.email,
                            password: hashedPassword
                        }
                        UserModel.addUser(userData, function(addUserErr, addUserData){
                            if(addUserErr){
                                console.log(addUserErr);
                                res.json({success: false, message: "Something went wrong"});
                            }else{
                                res.json({success: true, message: 'User registered successfully'});
                            }
                        })
                    }
                })
            }
        })
    }


}


module.exports = userController;