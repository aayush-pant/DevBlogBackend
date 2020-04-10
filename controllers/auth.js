const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            if (err => {
                                console.log(err);
                            })
                                res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login')
                });
        })
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    console.log(email, firstname, lastname, password, confirmPassword)
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log("User Already Exist")
                res.json({
                    ack: 0,
                    message: "User Already Exist"
                })
                return 0
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        password: hashedPassword
                    })
                    return user.save()
                })
                .then(result => {
                    res.json({
                        ack: 1,
                        message: "User Created"
                    })
                });
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })
}