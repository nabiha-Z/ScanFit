import mongoose from 'mongoose';

 const projectSchema = mongoose.Schema({
     title : {type:String,required: true},
     description : {type:String, required: true},
     area : {type:String, required: true},
     location : {type:String, required: true},
     features : {type:String, required: true},
     picture : {type:Array, required: true},
     price : {type:Number, required: true},
     type : {type:String, required: true},
     unit : {type:String,required: true }
     //status : {type: String, required: true},
     //usermail : {type:String, required: true},
     //category : {type:String, required: true},
     //subscribed : {type:String, required: true}


 });
 export default mongoose.model("project",projectSchema) ;
