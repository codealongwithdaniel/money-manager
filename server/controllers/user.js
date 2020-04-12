const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
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
                            password: hashedPassword,
                            name: req.body.name
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
    },

    signIn: function(req, res){
        console.log('Got requ')
        UserModel.checkUserExists(req.body.email, function(presentErr, isPresent){
            if(isPresent){
                UserModel.getUserByEmail(req.body.email, function(userErr, userRow){
                    if(userErr){
                        res.json({success: false, message: "Something went wrong"});
                    }else{
                        UserModel.comparePasswords(req.body.password, userRow.password, function(compareErr, compareResult){
                            console.log('Compare result',compareResult);
                            if(compareErr){
                                res.json({success: false, message: "Something went wrong"});
                            }else{
                                const token = jwt.sign({user_id: userRow.id}, keys.jwtSecret, { expiresIn: '2d'});
                                res.json({success: true, token: token, message: 'Sigin successfull'});
                            }
                        })
                    }
                })
            }else{
                res.json({success: false, message: "Something went wrong"});
            }
        })
    }
}


module.exports = userController;