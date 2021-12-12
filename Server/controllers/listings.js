import postListings from '../models/listings.js';
import ct from '../models/categories.js';
import user from "../models/users.js";
import mongoose from 'mongoose';


export const getListings = async (req, res) => {
    // console.log("tttttt");
    try {
        const featured = await postListings.find({ subscribed: 'featured' });
        const nonFeatured = await postListings.find({ $or: [{ subscribed: 'requested' }, { subscribed: 'false' }] });
        const count1 = await postListings.countDocuments({ subscribed: 'featured' });
        const count2 = await postListings.countDocuments({ $or: [{ subscribed: 'requested' }, { subscribed: 'false' }] });

        res.status(200).json({ 'message': true, "featured": featured, nonFeatured });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}
export const getuserListings = async (req, res) => {
    const mail = req.body.mail;

    try {

        postListings.find({
            usermail: mail
        }, function (err, docs) {
            res.status(201).json({
                "message": "true",
                "listings": docs
            });

        });





    } catch (error) {
        console.log(error);

    }
}


export const createListings = async (req, res) => {
    console.log("hello");
    const {
        title,
        description,
        area,
        location,
        features,
        picture,
        price,
        type,
        usermail,
        category,
        images,
        unit,
        year
    } = req.body;

    try {
        var fea = "";
        for (var i = 0; i < features.length; i++) {
            fea = fea + features[i] + ",";
        }
        //console.log("imagess = ", images)

        //console.log("picture= ", picture)
        // const newList = await postListings.create({title, description,area,location,features,picture,price,type,status:"pending",usermail});
        let date = new Date();
        // console.log("new date= ", date);
        // console.log("type = ", typeof(date));
        // console.log("year= ", year);
        const g = await postListings.create({
            title,
            description,
            area,
            location,
            features: fea,
            picture,
            price,
            type,
            status: "pending",
            usermail,
            category,
            subscribed: "false",
            images: images,
            unit,
            date,
            year
        });

        res.status(201).json({
            message: true
        });

        // console.log("category: ", category);
        const fetchData = await ct.findOne({ name: category });
        //console.log("fetch: ", fetchData);
        const { _id, name, img, count } = fetchData;
        // console.log("name= ",name);
        // console.log(typeof(count));
        const newCount = count + 1;
        // console.log("newCount=", newCount);
        //  console.log(_id);
        const s = await ct.findByIdAndUpdate(_id, { _id, name, img, count: newCount }, { new: true });
        //  console.log(s.name,s.count,s._id);
    } catch (error) {
        console.log(error);
        res.status(409).json({
            message: error.message
        });
    }
}

export const getApprovedListings = async (req, res) => {
    try {
        const listings = await postListings.find({
            status: 'approved'
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}

export const getFeaturesListing = async (req, res) => {
    try {
        const listings = await postListings.find({
            subscribed: 'requested'
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}

export const getPendingListings = async (req, res) => {
    try {
        const listings = await postListings.find({
            status: 'pending'
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}

export const getRejectedListings = async (req, res) => {
    try {
        const listings = await postListings.find({
            status: 'rejected'
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}
export const getApprovedRequested = async (req, res) => {
    try {
        const listings = await postListings.find({
            status: 'approved', subscribed: 'requested'
        });
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}


export const approveListings = async (req, res) => {
    const {
        id: _id
    } = req.params;
    // const {title, description,area,location,features,picture,price,type,status} = req.body;
    const listDetails = req.body;

    try {

        await postListings.findByIdAndUpdate(_id, {
            ...listDetails,
            _id
        }, {
            new: true
        });

        const listings = await postListings.find({
            status: 'pending'
        })
        res.status(200).json(listings);

    } catch {

        res.status(404).json({
            message: error.message
        });

    }

}

export const approveFeatured = async (req, res) => {

    const {
        id: _id
    } = req.params;
    // const {title, description,area,location,features,picture,price,type,status} = req.body;
    const listDetails = req.body;
    // console.log(listDetails);
    try {

        await postListings.findByIdAndUpdate(_id, {
            ...listDetails
        }, {
            new: true
        });



    } catch {

        res.status(404).json({
            message: error.message
        });

    }

}
export const rejectListings = async (req, res) => {

    const {
        id: _id
    } = req.params;
    const listDetails = req.body;

    try {

        await postListings.findByIdAndUpdate(_id, {
            ...listDetails,
            _id
        }, {
            new: true
        });

        const listings = await postListings.find({
            status: 'pending'
        })
        res.status(200).json(listings);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

}

export const searchListings = async (req, res) => {

    const { loc, area, categ, price1, price2, unit } = req.body;


    try {

       

        var areaa = parseInt(area);
        const minarea = areaa - 50;
        const maxarea = areaa + 50;

        //const findList = await postListings.countDocuments({area: area})

        const featuredList = await postListings.find({ $and: [{ $or: [{ location: loc }, { category: categ }, { price: { $gte: price1, $lte: price2 } }] }, { area: { $gte: minarea, $lte: maxarea } }, { unit: unit }, { subscribed: "featured" }] });
        const nonfeaturedList = await postListings.find({ $and: [{ $or: [{ location: loc }, { category: categ }, { price: { $gte: price1, $lte: price2 } }] }, { area: { $gte: minarea, $lte: maxarea } }, { unit: unit }, { $or: [{ subscribed: 'requested' }, { subscribed: 'false' }] }] });
        const count = await postListings.countDocuments({ $and: [{ $or: [{ location: loc }, { category: categ }, { price: { $gte: price1, $lte: price2 } }] }, { area: { $gte: minarea, $lte: maxarea } }, { unit: unit }, { $or: [{ subscribed: 'requested' }, { subscribed: 'false' }] }] });
        // console.log("list= ", nonfeaturedList);
        //  console.log("count= ", count)
        // {area : area},
        // {category: categ},
        // {price :{$gte:price1, $lte:price2}}

        res.status(202).json({ "messgae": true, featuredList, nonfeaturedList });

    } catch (error) {

        res.status(409).json({
            message: error.message
        });

    }

}



// export const getCategory = async (req, res) => {
//     const category = req.body;
//     try {
//         const listings = await postListings.find({
//             category: category
//         });

//         res.status(200).json(message='true',listings);
//     } catch (error) {
//         res.status(404).json({
//             message: error.message
//         });

//     }
// }
export const categorylist = async (req, res) => {
    const ctg = req.body.category;
    console.log("Server category= ", ctg);
    try {
        const list = await postListings.find({
            category: ctg
        });
        const count = await postListings.countDocuments({ category: ctg });
        // console.log("count= ", count);
        // if (ctg === "house") {


        //     res.status(200).json(HouseCategory);
        // } else if (ctg === "company") {
        //     const CompanyCategory = await postListings.find({
        //         category: 'Company'
        //     });

        //     res.status(200).json(CompanyCategory)
        // } else if (ctg === "villa") {
        //     const VillaCategory = await postListings.find({
        //         category: 'Villa'

        //     });

        res.status(200).json(list);
    }

    catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}

export const featureListings = async (req, res) => {
    const id = req.body.id;

    try {

        const listDetails = await postListings.findOne({ _id: id })
        const { _id, title, description, area, location, features, picture, price, type, status, usermail, category, subscribed } = listDetails;
        listDetails.subscribed = "requested"

        const updated = await postListings.findByIdAndUpdate(_id, {
            ...listDetails,
            subscribed
        }, {
            new: true
        });

        res.status(200).json({ updated });

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

}

export const deleteListing = async (req, res) => {

    const { id, user_id } = req.body;
    console.log("id,user_id ", id, user_id);

    try {

        // const listDetails = await postListings.findOne({ _id: id });
        // console.log(listDetails);

        const list = await postListings.findOne({ _id: id });
        // console.log("list = ", list.category)
        await postListings.findOneAndDelete({ _id: id });
        const userdata = await user.findOne({ _id: user_id });
        // console.log("user" + userdata);
        //console.log("initial limit" +userdata.limit);
        const limit = userdata.limit + 1;
        // console.log("increased limit" + limit);
        // console.log("brofre limit user= ", userdata.limit);
        userdata.limit = limit;
        // console.log("limit user= ", userdata.limit);
        const updated = await user.findByIdAndUpdate(user_id, {
            ...userdata,
            limit
        }, {
            new: true
        });

        // console.log("updated= ", updated);

        const fetchData = await ct.findOne({ name: list.category });

        const counter = await postListings.countDocuments({ category: list.category });
        // console.log("counter = ", counter);
        const { _id, name, img, count } = fetchData;
        // console.log("count after = ", fetchData.count);

        const s = await ct.findByIdAndUpdate(_id, { _id, name, img, count: counter }, { new: true });
        // console.log("count in table ", s.count);
        // console.log("")
        //console.log("updated user" +updated);

        res.status(200).json({ "message": true });

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

}

export const similar = async (req, res) => {

    const { category, unit } = req.body;

    try {

        // const listDetails = await postListings.findOne({ _id: id });
        // console.log(listDetails);

        const listing = await postListings.find({ $or: [{ category: category }, { unit: unit }] });
        //const listing = await postListings.find({price : {$gte:500}});

        res.status(200).json({ "message": true, listing });




    } catch (error) {

        res.status(202).json({
            message: error.message
        });

    }

}

export const recentListings = async (req, res) => {



    try {

        // const listDetails = await postListings.findOne({ _id: id });
        // console.log(listDetails);

        const listing = await postListings.find().sort({ date: -1 });
        //const listing = await postListings.find({price : {$gte:500}});
        // console.log("sorted listing= ", listing.length);
        res.status(200).json({ "message": true, listing });




    } catch (error) {

        res.status(202).json({
            message: error.message
        });

    }

}


