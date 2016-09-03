// var express = require("express");
// var path=require('path');
// var mongoose = require('mongoose');
// var _ = require('underscore');
// var Movie = require("./models/movie");
// var app = express();
// var port = process.env.PORT || 3000;

// app.set("views","./views/pages");
// app.set('view engine','jade');
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'bower_components')));


// app.listen(port);


var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./modals/movie');

// 静态资源请求路径
var path = require('path');
var bodyParser= require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
app.locals.moment = require('moment');

// movie为mongodb的一个数据库
mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');
app.set('view engine', 'ejs');

// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public')));
// console.info('__dirname',__dirname,path.join(__dirname, 'bower_components'));

// 表单数据格式化
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.listen(port);
var emptyMovie = {
    title: "",
    doctor: "",
    country: "",
    language: "",
    year: "",
    poster: "",
    summary: ""
};

console.log("obj start on port"+ port);


app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: '首页',
            movies: movies
        });
    });
});

//detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: movie.title,
            id: id,
            movie: movie
        });
    })
});

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: '后台录入页',
        movie: {

            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
});


//admin update movie
app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie
            });
        });
    }
});



//admin post movie
app.post('/admin/new', function(req, res) {

    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== "undefined"&&id!=='') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});



//list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '列表页',
            movies: movies
        });
    });
});


//admin delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }

})

