import category from '../models/categories.js';

export const createCategory = async (req,res) => {
    // console.log("trett");
    const {
        name,img
    
    } = req.body;
    
    if(await category.findOne({ name:name }).exec()){
        res.status(201).json({"message":false});
    }
   else{
    await category.create({
        name,img,count:0
    });
    res.status(201).json({"message":true});

}
}

export const getCategory = async (req, res) => {

    try {
        const categoryDetail = await category.find();
        const count = await category.find().countDocuments();
      
        //console.log(categoryDetail);
        res.status(200).json({categoryDetail});
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}
