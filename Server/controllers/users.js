import mongoose from "mongoose";
import Users from '../models/users.js'
import measurements from "../models/measurements.js";
import products from "../models/products.js";
import cart from "../models/cart.js";
import orders from "../models/order.js";
import jwt from "jsonwebtoken";
import config from "config";
import nodemailer from 'nodemailer';

export const getusers = async (req, res) => {
    try {
        const listings = await Users.find();
        res.status(200).json(listings);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}



export const loginuser = async (req, res) => {
    const id = req.body.id;
    //console.log("id ",id);

    // console.log("token server ",user _id.id);
    try {
        await Users.find({ _id: id })
            .then((data) => {
                //console.log("data:", data)
                res.status(201).json({ "message": true, "user": data[0] });
            }).catch((err) => {
                res.status(201).json({ "message": false, "error": err.message });

            })


        // await Users.find({ _id: id })
        // .then((data)=>{
        //     console.log("data:", data)
        //     res.status(201).json({ "message": true, "user": data });
        // }).cathc((err)=>{
        //     res.status(201).json({ "message": false, "error":err.message });
        // })

    } catch (error) {
        console.log("err:", error.message)
        res.status(201).json({ "message": false, 'error': error.message });
    }
}


export const signup = async (req, res) => {
    const { name, email, phonenumber, password, address } = req.body;
    console.log(name, email, phonenumber, password, address);
    try {

        if (await Users.findOne({ email: email }).exec()) {
            console.log("existed")
            res.status(201).json({ "message": false });
        }
        else {
            console.log("fdfs");

            await Users.create({ name, email, phonenumber, password, address, favorites: [] });
            Users.find({ email: email }, function (err, docs) {
                jwt.sign(
                    { id: docs[0].id },
                    "secretKey",
                    { expiresIn: "1h" },
                    (err, token) => {
                        try {
                            console.log("token:", token)
                            res.status(201).json({ "message": true, "token": token, user: docs[0] });

                        } catch (error) {
                            res.status(404).json({ message: error.message });
                        }
                    }
                )
            })

        }


    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const login = async (req, res) => {

    const { email, password } = req.body;
    console.log("email:", email);

    try {
        const existingUser = await Users.findOne({ email, password });
        if (!existingUser) {
            // res.send("none")
            console.log("Not found")
            return res.status(201).json({ message: false, error: "Invalid User" });
        } else {

            jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                config.get('jwtSecretKey'),
                { expiresIn: "1h" },
                (err, token) => {
                    try {
                        // res.send({ "message": true, "token": token, "user": existingUser })
                        return res.status(201).json({ "message": true, "token": token, "user": existingUser });

                    } catch (error) {
                        // res.send(error.message)
                        return res.status(201).json({ message: false, error: error.message });
                    }
                }
            )

        }
    }
    catch (error) {
        // res.send(error.message);
        return res.status(409).json({ message: false, error: error.message });
    }
}


export const favList = async (req, res) => {

    const { item, user_id } = req.body;
    //console.log("listid"+id);
    //console.log("user_id"+id);

    try {

        const userData = await Users.findOne({ _id: user_id });
        const { _id, name, email, phonenumber, password, type, status, favorites, masterid, access, limit, message } = userData;
        //console.log("patch= ",userData);
        // favorites= 
        //const check=true;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]._id === item._id) {

                console.log("in loop")
                res.status(200).json({ "message": false });
                //check =!check;
            }
            // if(i === favorites.length) {
            //     return}
        }
        //console.log(check);
        //if (check=== true){
        console.log("in fav");
        favorites.push(item);
        const updated = await Users.findByIdAndUpdate({ _id: user_id }, { _id, name, email, phonenumber, password, type, status, favorites, masterid, limit, access, message }, { new: true });
        res.status(200).json({ "message": true });
        //}
        // else{
        //      //console.log("false")
        //      res.status(200).json({"message":false});
        //  }



        //console.log("updated"+updated);


    } catch (error) {

        res.status(404).json({ message: error.message });
    }

}

export const unfavList = async (req, res) => {

    console.log("unsaved");
    const { item, user_id } = req.body;
    const userdata = await Users.findOne({ _id: user_id });

    const { _id, favorites, name, email, phonenumber, password, type, status, masterid, access, limit, message } = userdata;
    console.log("initial favlist" + favorites);
    try {
        console.log("length before = ", favorites.length);
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]._id === item._id) {
                console.log("in fav loop", i);
                favorites.splice(i, i + 1);
                break;
                // console.log("in loop")
                // res.status(200).json({"message":false});
                //check =!check;
            }
        }
        console.log("final favlist" + favorites);
        console.log("length= ", favorites.length);
        const updated = await Users.findByIdAndUpdate(
            user_id, { _id, name, email, phonenumber, password, type, status, masterid, access, limit, favorites, message }, { new: true });

        //console.log("updated user fav"+updated);
        res.status(200).json({ "message": true });

    } catch (error) {

        res.status(404).json({ message: error.message });

    }
}
export const fetchSaved = async (req, res) => {

    console.log("fetchsaved");
    const { id } = req.body;
    try {

        //let list = [];

        const userData = await Users.findOne({ _id: id }).exec();

        //console.log("userData" + userData);
        const { _id, name, email, phonenumber, password, type, Status, favorites, limit, access, message } = userData;
        //console.log("userData" + userData.favorites[0].title);
        console.log("destructuring");
        if (favorites.length === 0) {


            res.status(200).json({ 'message': false, favorites });

        }
        // let list = [];

        // for (let i = 0; i < favorites.length; i++) {

        //    // console.log("favorites" + i + favorites[i] );
        //     const index = favorites[i];
        //     const r = await products.findOne({_id:index});
        //     //console.log("r" +r);


        //     list.push(r);
        // }

        // let list1 = [];
        // list1.push(list)
        //console.log("list1 "+typeOf(favorites));
        //console.log("list= ", list);
        res.status(200).json({ 'message': true, favorites: userData.favorites });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }


}

export const getuserdetails = async (req, res) => {

    const id = req.body.user_id;
    try {

        const details = await Users.findOne({ _id: id });
        res.status(200).json({ details });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {

    const { username, useremail, contact, image, id } = req.body;
    console.log(username, contact);
    try {
        const userdata = await Users.findOne({ _id: id });
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit, message } = userdata;
        const updated = await Users.findByIdAndUpdate(_id, { _id, name: username, email, phonenumber: contact, password, type, status, masterid, access, limit, message }, {
            new: true
        });
        console.log("updated= ", updated)



        res.status(200).json({ 'message': true });
    } catch (error) {
        console.log(error)
            ;
    }

}

export const changePassword = async (req, res) => {

    const { newPassword, useremail } = req.body;
    console.log(newPassword);
    try {
        const userdata = await Users.findOne({ email: useremail });
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit, message } = userdata;
        const updated = await Users.findByIdAndUpdate(_id, { _id, name, email, phonenumber, password: newPassword, type, status, masterid, access, limit, message }, {
            new: true
        });

        res.status(200).json({ 'message': true });
    } catch (error) {
        res.status(200).json({ 'message': false });
    }

}



export const forgotPassword = async (req, res) => {


    const { email } = req.body;
    console.log("email rest pass= ", email);
    try {
        await Users.findOne({ email: email })
            .then(users => {
                if (!users) {
                    console.log("Error");
                    return res.status(200).json({ 'message': false, error: "User dont exists with that email" })
                }

                var transporter = nodemailer.createTransport({

                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS
                    },

                });

                console.log("mail= ", users.email);
                var currentDateTime = new Date();
                var mailOptions = {
                    from: 'no-reply@gmail.com',
                    to: users.email,
                    subject: "Reset password link",

                    html: `<h1>You requested for password reset </h1><p>\
              If You are requested to reset your password then click on below link<br/>\
             <a href="http://localhost:3000/resetpassword/${users.email}">Click On This Link to reset</a><br/>\
             This link will expire within 1 hour.<br/>\
              </p>`
                };

                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        console.log("not sent: ", error);
                    } else {

                        const token = jwt.sign(
                            { id: users._id },
                            process.env.resetToken,
                            { expiresIn: "600s" }
                        )

                        const expire = Date.now() + 3600000;
                        const { _id, firstName, lastName, email, password, resetToken, expires } = users;
                        const a = await Users.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: token, expires: expire }, { new: true });

                        console.log("a= ", a.expires);
                        return res.status(200).json({ 'message': true, success: "Check your email" })

                    }
                });
                // console.log("message")
            })
    } catch (error) {
        // console.log("err in catch=", error);

        return res.status(404).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    console.log("reset");
    console.log("email= ", req.body);
    const { pass, user_email } = req.body;
    console.log("email= ", user_email);
    try {

        let users = await Users.findOne({ email: user_email, expires: { $gt: Date.now() } })

        if (!users) {
            return res.status(200).json({ "message": false, error: "Try again sesssion expired!" });
        } else {


            console.log("user= ", users.user_email);

            console.log("before:", users.password);


            // const salt = await bcrypt.genSalt(10);

            // const hashedPassword = await bcrypt.hash(pass, salt);
            const { _id, firstName, lastName, email, password, resetToken, expires } = users;
            console.log("expires= ", expires);
            const a = await Users.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: pass, resetToken: null, expires: null }, { new: true });
            console.log("a= ", a.password);
            console.log("a= ", a.token);

            return res.status(200).json({ "message": true, success: "Password Chanegd!\n Sign in to Continue." });
        }


    } catch (error) {
        return res.status(200).json({ message: error.message });
    }


}

export const fetchMeasurements = async (req, res) => {


    console.log("req.body.uid: ", req.body.uid)

    await measurements.find({ user: req.body.uid })
        .then((data) => {
            console.log("measuremenet: ", data)
            return res.status(200).json({ "message": true, "measurement": data });
        }).catch((err) => {
            return res.status(200).json({ "message": false, "error": err.message });
        })

}

export const deleteMeasurements = async (req, res) => {

    console.log("req.body.mid: ", req.body.mid)

    await measurements.findOneAndDelete({ _id: req.body.mid })
        .then((data) => {
            console.log("Deleted")
            return res.status(200).json({ "message": true });
        }).catch((err) => {
            return res.status(200).json({ "message": false });
        })

}

export const editMeasurements = async (req, res) => {

    // const { shoulders, arms, fullLength, knee, waist, shirt, bottom } = req.body;
    const { shoulders, arms, fullLength, knee } = req.body;
    const mid = req.body.mid;
    console.log("mid:", mid)

    await measurements.findByIdAndUpdate({ _id: mid }, { shoulders, fullLength, arms, knee }, { new: true })
        .then((data) => {
            console.log("data:", data)
            res.status(201).json({ "message": true })
        }).catch((err) => {
            res.status(201).json({ "message": false, "error": err.message })
        })
}

// export const sendMessage = async (req, res) => {

//     console.log(req.body);
//     const { email: em, phonenumber: ph, msg: msg1 } = req.body;

//     try {

//         const userdata = await Users.findOne({ email: em });
//         console.log("in msg userdata", userdata);
//         const { _id, name, email, phonenumber, password, type, status, masterid, access, limit, message } = userdata;

//         const updated = await Users.findByIdAndUpdate(_id, { _id, name, email, phonenumber: ph, password, type, status, masterid, access, limit, message: msg1 }, {
//             new: true
//         });
//         //console.log("in msg updated",updated);
//         res.status(200).json({ 'message': true });


//     } catch (error) {
//         return res.status(200).json({ message: error.message });
//     }
// }

export const categorySearch = async (req, res) => {

    console.log("req.body.category", req.body.category)
    await products.find({ category: req.body.category })
        .then((data) => {
            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}


export const filterProducts = async (req, res) => {

    const { color, categ, price } = req.body;
    await products.find({ $or: [{ category: categ }, { price: price }, { color: color }, { main_category: categ }] })
        .then((data) => {

            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const searchProducts = async (req, res) => {

    const txt = req.body.searchtxt;
    await products.find({ $or: [{ title: txt }, { category: txt }, { color: txt }, { price: txt }, { main_category: txt }] })
        .then((data) => {

            res.status(201).json({ message: true, products: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const getProduct = async (req, res) => {

    console.log("pid:", req.body.pid)
    await cart.find({ user: req.body.pid })
        .then((data) => {
            console.log("cart: ", data)
            res.status(201).json({ message: true, cart: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}

export const fetchCart = async (req, res) => {

    console.log("id:", req.body.uid)
    await cart.find({ user: req.body.uid }).populate('items.pid')
        .then((data) => {
            console.log("cart: ", data)
            res.status(201).json({ message: true, cart: data })
        }).catch((err) => {
            res.status(201).json({ message: false, error: err.message })
        })
}


export const addInCart = async (req, res) => {

    const { uid, product } = req.body;
    // console.log("prod:", product)

    var quantity = 0, errors = "", count = 0;
    const cartData = await cart.find({ user: uid })
    try {
        if (cartData.length !== 0) {
            console.log("cart items: ", cartData[0].items)
            cartData[0].items.map((item) => {
                console.log("pid: ", item.pid)
                var id = JSON.stringify(item.pid)
                console.log("product : ", product._id)
                if (id.includes(product._id)) {
                    count = 1;
                    console.log("before: ", item.quantity)
                    quantity = item.quantity + 1;
                    item.quantity = quantity
                    console.log("after update: ", cartData[0]._id)
                    cart.findByIdAndUpdate({ _id: cartData[0]._id }, { items: cartData[0].items }, { new: true })
                        .then((data) => {
                            console.log(data);

                        }).catch((err) => {
                            errors = err.message
                            console.log("err found: ", err.message)
                        })

                }

            })
        }


        if (count === 0) {

            var productObj = {
                pid: product._id,
                quantity: 1
            }
            var items = [];
            items.push(productObj)

            console.log("items: ", items)
            await cart.create({ items, user: uid })
                .then((data) => {
                    console.log(data);

                }).catch((err) => {
                    errors = err.message
                    console.log("err: ", err.message)
                })




        }
        if (errors.length === 0) {
            res.status(201).json({ message: true })
        } else {
            res.status(201).json({ message: false, error: err.message })
        }

    }
    catch (err) {
        console.log("error: ", err.message)
    }


}

export const updateQuantity = async (req, res) => {

    const { cid, pid, quantity } = req.body;
    const cartData = await cart.find({ _id: cid })
    try {
        cartData[0].items.map((item) => {

            console.log("pid: ", item.pid)
            var id = JSON.stringify(item.pid)
            console.log("product : ", pid)
            if (id.includes(pid)) {
                console.log("before: ", item.quantity)
                item.quantity = quantity
            }
            console.log("after update: ", item.quantity)
        })
        await cart.findByIdAndUpdate({ _id: cid }, { items: cartData[0].items }, { new: true })
            .then((data) => {

                res.status(201).json({ message: true, cart: data })
            }).catch((err) => {
                res.status(201).json({ message: false, error: err.message })
            })

    }
    catch (err) {
        console.log("error: ", err.message)
    }

}


export const deleteCartItem = async (req, res) => {

    const { cid, pid } = req.body;
    const cartData = await cart.find({ _id: cid })
    const itemsArr = cartData[0].items;
    try {

        const index = itemsArr.findIndex(item => JSON.stringify(item.pid).includes(pid));
        console.log(index);
        var temp = itemsArr.slice(index+1,itemsArr.length)
        console.log("temp: ", temp)
        // cartData[0].items.map((item) => {

        //     console.log("pid: ", item.pid)
        //     var id = JSON.stringify(item.pid)
        //     console.log("product : ", pid)
            
        //     if (id.includes(pid)) {
        //         console.log("before: ", item.quantity)
                

                
        //     }
        //     console.log("after update: ", item.quantity)
        // })
        await cart.findOneAndDelete({ _id: cid })
            .then((data) => {
                cobsole.log("data: ", data)
                res.status(201).json({ message: true })
            }).catch((err) => {
                res.status(201).json({ message: false, error: err.message })
            })
      
    }
    catch (err) {
        console.log("error: ", err.message)
    }

}