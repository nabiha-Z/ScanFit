import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    
    name : {type:String,required: true},
    img : {type:String, required: true},
    count : {type:Number},

});


export default mongoose.model("categories",categorySchema) ;