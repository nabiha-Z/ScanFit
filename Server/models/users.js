import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    password: { type: String, required: true },
    picture :{type: Array},
    favorites: { type: Array, required: true },
    resetToken: { type: String},
    expires: { type: Date },
    address: {type:String, required:true},

});
export default mongoose.model("users", usersSchema,'Users');

