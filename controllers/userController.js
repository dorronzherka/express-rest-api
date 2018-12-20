const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const authN = passport.authenticate('jwt', { session: false});
const userValidation = require("../middlewares/user-validator");
const loginValidation = require("../middlewares/login-validator");
const updatePasswordValidation = require("../middlewares/update-password-validator");
const config = require('../config/database');
const jwt = require('jsonwebtoken');

// Route for sign up 
router.post('/signup',userValidation, (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findUserByUsername(req.body.username)
        .then(user => {
            if(user) {
                res.statusCode = 409;
                res.json(`User with username ${req.body.username} exsists`);
            } else {
                User.addUser(newUser)
                    .then(data => {
                        res.json({
                            success : true,
                            msg: "User added"
                        });
                    }).catch(errAddUser => {
                        res.statusCode = 500;
                        res.statusMessage = "Database error";
                        res.json({err: errAddUser});
                    })
            }
        }).catch(err => {
            res.statusCode = 500;
            res.statusMessage = "Database error";
            res.json({err: err});
        });
});

// router for login
router.post('/login', loginValidation, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findUserByUsername(req.body.username)
    .then(user => {
        if(!user) {
            res.statusCode = 404;
            res.json(`User with username ${req.body.username} not found`);
        } else {
            User.comparePassword(password, user.password)
                .then(matched => {
                    if(!matched) {
                        res.statusCode = 401;
                        res.json(`You typed wrong password`);
                    } else {
                        const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 86400 });
                        let userData = {
                            success: true,
                            token: 'JWT ' + token,
                            user: {
                                id: user._id,
                                username: user.username,
                            }
                        }
                        res.json(userData)
                    }
                }).catch(passErr => {
                    res.statusCode = 500;
                    res.statusMessage = "Database error";
                    res.json({err: passErr});
                });
        }
    }).catch(err => {
        res.statusCode = 500;
        res.statusMessage = "Database error";
        res.json({err: err});
    });
});

// router for getting information loggedin user
router.get('/me',authN, (req, res) => {
    User.findUserById(req.user._id)
        .then(user => {
             if(!user[0]) {
                res.statusCode = 404;
                res.json("User doesn't exsisit");
             } else {
                 res.json(user[0]);
             }
        }).catch(err => {
        res.statusCode = 500;
        res.statusMessage = "Database error";
        res.json({err: err});
    });
});

// router for getting information loggedin user
router.put('/me/update-password',authN, updatePasswordValidation, (req, res) => {
    User.updatePassword(req.user._id, req.body.password)
        .then(user => {
            console.log(user)
             if(!user) {
                res.statusCode = 409;
                res.json("User doesn't exsisit");
             } else {
                 res.json({
                     success : true,
                     msg: "Password updated"
                 });
             }
        }).catch(err => {
        res.statusCode = 500;
        res.statusMessage = "Database error";
        res.json({err: err});
    });
});



// router for getting information specific user
router.get('/user/:id', (req, res) => {
    User.findUserById(req.params.id)
        .then(user => {
             if(!user[0]) {
                res.statusCode = 404;
                res.json("User doesn't exsisit");
             } else {
                 res.json(user[0]);
             }
        }).catch(err => {
        res.statusCode = 500;
        res.statusMessage = "Database error";
        res.json({err: err});
    });
});

// router for liking a user
router.post('/user/:id/like', authN, (req, res) => {
    console.log(req.user)
    User.findLike(req.params.id, req.user._id)
        .then(user => {
            if(user) {
                res.statusCode = 409;
                res.json(`You liked user with username ${user.username}`);
            } else {
              User.like(req.params.id, req.user._id)
                .then(like => {
                    res.json({
                        success : true,
                        msg: "You liked"
                    });
                }).catch(likeErr => {
                    res.statusCode = 500;
                    res.statusMessage = "Database error";
                    res.json({err: likeErr});
                });
            }
        }).catch(err => {
            res.statusCode = 500;
            res.statusMessage = "Database error";
            res.json({err: err});
        });
});

// router for unliking a user
router.delete('/user/:id/unlike', authN, (req, res) => {
    console.log(req.user)
    User.findLike(req.params.id, req.user._id)
        .then(user => {
            if(!user) {
                res.statusCode = 409;
                res.json(`You didn't liked this user`);
            } else {
              User.unlike(req.params.id, req.user._id)
                .then(like => {
                    res.json({
                        success : true,
                        msg: "You unliked"
                    });
                }).catch(likeErr => {
                    res.statusCode = 500;
                    res.statusMessage = "Database error";
                    res.json({err: likeErr});
                });
            }
        }).catch(err => {
            res.statusCode = 500;
            res.statusMessage = "Database error";
            res.json({err: err});
        });
});
// router for getting information loggedin user
router.get('/most-liked', (req, res) => {
    User.getAllUsersByLikes()
        .then(users => {
             if(users.length == 0) {
                res.statusCode = 404;
                res.json("There are no users");
             } else {
                 res.json(users);
             }
        }).catch(err => {
        res.statusCode = 500;
        res.statusMessage = "Database error";
        console.log(err)
        res.json({err: err});
    });
});


module.exports = router;