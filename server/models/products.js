import mongoose from 'mongoose';

 const productsSchema = mongoose.Schema({
     title : {type:String,required: true},
     description : {type:String, required: true},
     picture : {type:String, required: true},
     price : {type:Number, required: true},
     category : {type:String, required: true},
     images : {type:Array, requires: true}, 
     color : {type:String, required: true}, 
     sizes : {type:Array, required: true}


 });
//  var db=mongoose.connection;
// db.createCollection("postListings");
  export default mongoose.model("products",productsSchema, 'Products') ;
