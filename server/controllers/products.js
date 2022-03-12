import products from '../models/products.js';
import user from "../models/users.js";
import mongoose from 'mongoose';


export const getProducts = async (req, res) => {

    try {
        const items = await products.find({});
        res.status(200).json({ 'message': true, "products": items });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });

    }
}



export const addProducts = async (req, res) => {
    console.log("hello");
    const {
        title,
        description,
        picture,
        price,
        category,
        images,
        color
    } = req.body;

    console.log(title,
        description,
        picture,
        price,
        category,
        images,
        color);
    try {


        const g = await products.create({
            title,
            description,
            picture,
            price,
            category,
            images,
            color,
            sizes: ['s', 'm', 'l']
        });

        res.status(201).json({
            message: true
        });


    } catch (error) {
        console.log(error);
        res.status(409).json({
            message: error.message
        });
    }
}



// export const deleteProduct = async (req, res) => {

//     const { id, user_id } = req.body;
//     console.log("id,user_id ", id, user_id);

//     try {

//         // const listDetails = await products.findOne({ _id: id });
//         // console.log(listDetails);

//         const list = await products.findOne({ _id: id });
//         // console.log("list = ", list.category)
//         await products.findOneAndDelete({ _id: id });
//         const userdata = await user.findOne({ _id: user_id });
//         // console.log("user" + userdata);
//         //console.log("initial limit" +userdata.limit);
//         const limit = userdata.limit + 1;
//         // console.log("increased limit" + limit);
//         // console.log("brofre limit user= ", userdata.limit);
//         userdata.limit = limit;
//         // console.log("limit user= ", userdata.limit);
//         const updated = await user.findByIdAndUpdate(user_id, {
//             ...userdata,
//             limit
//         }, {
//             new: true
//         });

//         // console.log("updated= ", updated);

//         const fetchData = await ct.findOne({ name: list.category });

//         const counter = await products.countDocuments({ category: list.category });
//         // console.log("counter = ", counter);
//         const { _id, name, img, count } = fetchData;
//         // console.log("count after = ", fetchData.count);

//         const s = await ct.findByIdAndUpdate(_id, { _id, name, img, count: counter }, { new: true });
//         // console.log("count in table ", s.count);
//         // console.log("")
//         //console.log("updated user" +updated);

//         res.status(200).json({ "message": true });

//     } catch (error) {

//         res.status(404).json({
//             message: error.message
//         });

//     }

// }


