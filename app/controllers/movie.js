var _ = require('underscore');
var Movie = require('../modals/movie');
var Comment = require('../modals/comment');
var Categroy = require('../modals/categroy');

//detail page
exports.detail= function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        Comment
                .find({movie:id})
                .populate('from','name')
                .populate('reply.from reply.to','name')
                .exec(function(err,comments){
                //console.log(comments);
                    res.render('detail', {
                    title: movie.title,
                     movie: movie,
                     comments:comments
                     });
                })

    })
};

//admin page
exports.new= function (req, res) {
    Categroy.find({},function(err,categroies){
        res.render('admin', {
            title: '后台录入页',
            categroies:categroies,
             movie:{}
    });
    })


};


//admin update movie
exports.update= function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            Categroy.find({},function(err,categroies){
                res.render('admin', {
                    title: '后台更新页',
                    movie: movie,
                    categroies:categroies
                });
            });

        });
    }
};


//admin post movie
exports.save=function (req, res) {

    var id = req.body.movie._id;
    console.log('id is:');

    var movieObj = req.body.movie;
    //console.log(movieObj);
    var _movie;
    if (id) {

        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie(movieObj);
        var categroyId=movieObj.categroy;
        var categroyName=movieObj.categroyName;
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            if(categroyId){
                Categroy.findById(categroyId,function(err,categroy){
                    categroy.movies.push(movie._id);
                    categroy.save(function(err,categroy){
                        res.redirect('/movie/' + movie._id);
                    })
                })
            }
            else if(categroyName){
               var categroy=new Categroy({
                   name:categroyName,
                   movies:[movie._id]
               })
                categroy.save(function(err,categroy){
                    movie.categroy=categroy._id;
                    movie.save(function(err,movie){
                        res.redirect('/movie/'+movie._id)
                    })

                })
            }


        });
    }
};


//list page
exports.list=function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '列表页',
            movies: movies
        });
    });
};


//admin delete movie
exports.del= function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }

}
