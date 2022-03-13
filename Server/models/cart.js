import mongoose from 'mongoose';

 const cartSchema = mongoose.Schema({
     items : { type:Array, required:true },
     user :{ type:String, required:true }


 });
  export default mongoose.model("carts",cartSchema, 'carts') ;
