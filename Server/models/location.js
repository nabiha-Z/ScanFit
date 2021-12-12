import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    
    location : {type:String,required: true},
    

});


export default mongoose.model("location",locationSchema) ;