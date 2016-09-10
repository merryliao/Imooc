var mongoose=require('mongoose');
var CategorySchema=require('../schemas/category');
var Categroy=mongoose.model('Categroy',CategorySchema);
module.exports=Categroy;

