
var User = require('../modals/user');

//showSignUp
exports.showSignUp= function (req, res) {
    res.render('signup',{
        title:'用户注册页面'
    })


}

//siginup
exports.signup= function (req, res) {
    var _user = req.body.user;
    console.log(_user);
    User.find({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log(user.length);
        if (user.length != 0) {
            console.log('had this name');
            return res.redirect('/signin');
        } else {
            var user = new User(_user);
            user.save(function (err, user) {
                //console.log(user);
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            })
        }
    })


}
//Userlist page
exports.list= function (req, res) {
        User.fetch(function (err, users) {
            if (err) {
                console.log(err);
            }
            res.render('userList', {
                title: '用户列表页',
                users: users
            });
        });

};

//showSignIn
exports.showSignIn= function (req, res) {
    res.render('signin',{
        title:'用户登录页面'
    })


}

//signin
exports.signin= function (req, res) {
    var _user = req.body.user;
    //console.log(_user);
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/signup');
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                //console.log('password is matched');
                return res.redirect('/');
            }
            else {
                return res.redirect('/signin');

            }

        })

    })

}
//logout

exports.logout= function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
}

//midware for user
exports.signinRequest=function(req,res,next){
    var user=req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next();
}


exports.adminRequest=function(req,res,next){
    var user=req.session.user;
    if(user.role<=10){
        return res.redirect('/signin');
    }
    next();

}

