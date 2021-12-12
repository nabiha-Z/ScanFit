import loc from '../models/location.js';

export const createLocation = async (req,res) => {
    const {
        location
    
    } = req.body;
    

    if(await loc.findOne({ location: location }).exec()){
        res.status(201).json({"message":false});
    }
   else{
    await loc.create({
        location
    });
    res.status(201).json({
        "message": true
    });

}
}

export const getLocation= async (req, res) => {
  
    try {
        const locationDetail = await loc.find();
        res.status(200).json({locationDetail});
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}