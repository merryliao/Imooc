//index
var Movie = require('../modals/movie');
var Categroy = require('../modals/categroy');
exports.search=function(req,res){
    var catId = req.query.cat;
    console.log('catId is:')

    var q=req.body.q;
    console.log(q);
    var page = parseInt(req.query.p,10)||0;
    var count=2;
    var index = page*count;
    if(catId) {
        Categroy
            .find({_id: catId})
            .populate({path: 'movies'})
            .exec(function (err, categroies) {
                if (err) {
                    console.log(err);
                }
                var categroy = categroies[0] || {};
                var movies = categroy.movies || {};
                var results = movies.slice(index, index + count);


                res.render('results', {
                    title: 'Imooc 结果列表页',
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length / count),
                    keyword: categroy.name,
                    movies: results,
                    query: 'cat=' + catId
                });
            });
    }else{
        console.log(catId);
        Movie
            .find({title:new RegExp(q+'.*','i')})
            .exec(function(err,movies){
                if(err){
                    console.log(err);
                }

                var results=movies.slice(index,index+2);
                res.render('results',{
                    title:'movie 结果列表页',
                    keyword:q,
                    currentPage:(page+1),
                    query:'q='+q,
                    totalPage:Math.ceil(movies.length/count),
                    movies:results
                })
            })


    }




}


exports.index=function(req,res){
    Categroy
        .find({})
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,categroies){
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: '首页',
                categroies: categroies
            });
        });





}
