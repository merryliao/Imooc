

var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var User=require('../app/controllers/user');
var Comment=require('../app/controllers/comment');
var Categroy=require('../app/controllers/Categroy');

module.exports=function(app) {
//pre handle user
    app.use(function (req, res, next) {
        var _user = req.session.user;
            app.locals.user = _user;
            return next();
    });
    //index page
    app.get('/',Index.index);


//signup
//show signup
app.get('/signup',User.showSignUp);
 app.post('/user/signup',User.signup);
 //signin
 app.get('/signin',User.showSignIn);
 app.post('/user/signin',User.signin);
//logout
 app.get('/logout',User.logout);
  //userList
 app.get('/admin/user/list',User.signinRequest,User.adminRequest,User.list);


    //Moive
 //detail page
  app.get('/movie/:id',Movie.detail);
 //admin new page
  app.get('/admin/movie/new',User.signinRequest,User.adminRequest,Movie.new);
  //admin update page
   app.get('/admin/movie/update/:id',User.signinRequest,User.adminRequest,Movie.update);
   //admin post movie
    app.post('/admin/movie/new',User.signinRequest,User.adminRequest,Movie.save);
   // movie list page
  app.get('/admin/movie/list',User.signinRequest,User.adminRequest,Movie.list);
    //movie delete
    app.delete('/admin/movie/list',User.signinRequest,User.adminRequest,Movie.del);

    //comment
    app.post('/user/comment',User.signinRequest,Comment.save);
 //categroy
    app.get('/admin/categroy/new',User.signinRequest,User.adminRequest,Categroy.new);
    app.post('/admin/categroy',User.signinRequest,User.adminRequest,Categroy.save);
    app.get('/admin/categroyList',User.signinRequest,User.adminRequest,Categroy.list);
    app.get('/admin/categroy/update/:id',User.signinRequest,User.adminRequest,Categroy.update)


    //search
    app.post('/results/',Index.search);
    app.get('/results/',Index.search);
}

