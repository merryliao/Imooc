
<!--master-->
var express = require('express');
var jade = require('jade');
var mongoose = require('mongoose');
var mongoStore=require('connect-mongodb');

var logger = require('morgan');



// 静态资源请求路径
var path = require('path');
var bodyParser= require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
app.locals.moment = require('moment');
var dbUrl='mongodb://localhost/imooc'
// movie为mongodb的一个数据库
mongoose.connect(dbUrl);

app.set('views', './app/views/pages');
app.set('view engine', 'ejs');

// 静态资源请求路径
app.use(express.static(path.join(__dirname, 'public')));
// console.info('__dirname',__dirname,path.join(__dirname, 'bower_components'));

// 表单数据格式化
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var cookieParser=require('cookie-parser');
var session=require('express-session');
app.use(cookieParser());
app.use(session({
    secret:'imooc',
    store:new mongoStore({
        url:dbUrl,
        collection:'session'
    })
}));
if('development'=== app.get('env')){
    app.set('showStackError',true);
    app.use(logger(':method :url :status'));
    app.locals.pretty=true;
    mongoose.set('debug',true);
}


app.listen(port);

console.log("obj start on port"+ port);

require('./config/routes')(app);
