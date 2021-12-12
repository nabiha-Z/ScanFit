import mongoose from 'mongoose';

 const listingsSchema = mongoose.Schema({
     title : {type:String,required: true},
     description : {type:String, required: true},
     area : {type:Number, required: true},
     location : {type:String, required: true},
     features : {type:String, required: true},
     picture : {type:String, required: true},
     price : {type:Number, required: true},
     type : {type:String, required: true},
     status : {type: String, required: true},
     usermail : {type:String, required: true},
     category : {type:String, required: true},
     subscribed : {type:String, required: true},
     images : {type:Array, requires: true}, 
     unit : {type:String, requires: true},
     date: {type:Date},
     year: {type:Number}


 });
//  var db=mongoose.connection;
// db.createCollection("postListings");
  export default mongoose.model("postListing",listingsSchema) ;
