import mongoose from 'mongoose';

const measurementsSchema = mongoose.Schema({
    shoulders: { type: Number },
    fullLength: { type: Number },
    arms: { type: Number  },
    knee: { type: Number  },
    waist: { type: Number },
    user: {type:String}


});
export default mongoose.model("measurements", measurementsSchema,'measurements');


