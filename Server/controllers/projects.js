import project from '../models/projects.js'

export const createProject = async (req, res) => {
    
    const {
        title,
        description,
        area,
        location,
        features,
        picture,
        price,
        type,
        unit
        // usermail,
        // category
    } = req.body;
    console.log(req.body);
    try {
        var fea = "";
        for (var i = 0; i < features.length; i++) {
            fea = fea + features[i]+",";
        }
        // const newList = await postListings.create({title, description,area,location,features,picture,price,type,status:"pending",usermail});
        await project.create({
            title,
            description,
            area,
            location,
            features: fea,
            picture,
            price,
            type,
            unit
            // status: "pending",
            // usermail,
            // category,
            // subscribed: "false"
        });
        res.status(201).json({
            message: true
        });
    }catch (error) {
            console.log(error);
            res.status(409).json({
                message: error.message
            });
        }
    }

    export const getProjects = async (req, res) =>{
       
        try{
            const projects = await project.find();
            
            res.status(201).json({'message':true, projects});
            
        }catch (error) {
            console.log(error);
            res.status(409).json({
                message: error.message
            });
        }
    }