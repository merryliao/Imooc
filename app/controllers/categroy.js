var Categroy=require('../modals/categroy');

exports.new=function(req,res){
    res.render('categroy-admin',{
        title:'后台分类录入页',
        categroy:{

        }
    })


}

exports.save=function(req,res){
    var _categroy=req.body.categroy;
    console.log(_categroy);
    var categroy=new Categroy(_categroy);
    categroy.save(function(err,categroy){
        console.log('categroy is:');
        console.log(categroy);
        if(err){
            console.log(err);
        }
        res.redirect('/admin/categroyList');
    })
}


//categroylist page
exports.list= function (req, res) {
    Categroy.fetch(function (err, categroies) {
        if (err) {
            console.log(err);
        }
        //console.log(categroies);
        res.render('CategroyList', {
            title: '电影分类列表页',
            categroies: categroies
        });
    });

};

exports.update=function(req,res){
    var id=req.params.id;
    if(id){
        Categroy.findById(id,function(err,categroy){
         if(err){
             console.log(err);
         }
            res.render('categroy-admin',{
                  title:'电影分类更新页',
                  categroy:categroy
            })
        })
    }


}