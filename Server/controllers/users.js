import mongoose from "mongoose";

import user from "../models/users.js";
import listing from "../models/products.js";


import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import config from "config";
import nodemailer from 'nodemailer';

export const getusers = async (req, res) => {
    try {
        const listings = await user.find();
        res.status(200).json(listings);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const getmessages = async (req, res) => {
    
    try {
        const listings = await user.find();
        const messages = [];

        for(let i=0;i<listings.length;i++){
            
            if( (listings[i].message != null) && (listings[i].message != "" ) ){
                messages.push(listings[i]);
            }    
        }
        console.log(messages);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}



export const unapprovedusers = async (req, res) => {
    try {
        const listings = await user.find({ status: "unapproved" });

        res.status(200).json(listings);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const fetchpropertydealers = async (req, res) => {
    try {
        const listings = await user.find({ type: "property-dealer",access:"requested" });

        res.status(200).json(listings);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}
export const loginuser = async (req, res) => {
    const token = req.body.token;
      //console.log("IIII token server ",token);
    const user_id = jwt_decode(token);

    // console.log("token server ",user_id.id);
    try {
        if (await user.findOne({ _id: user_id.id }).exec()) {
            user.find({ _id: user_id.id }, function (err, docs) {
                // console.log("user ",docs[0])
                res.status(201).json({ "message": "true", "user": docs[0] });

            });

        }
        else {
            res.status(201).json({ "message": "false" });
        }
    } catch (error) {


    }
}


export const signup = async (req, res) => {
    const { name, email, phonenumber, password, address } = req.body;
    console.log(name, email, phonenumber, password, address);
    try {

        if (await user.findOne({ email: email }).exec()) {
            console.log("existed")
            res.status(201).json({ "message": "false" });
        }
        else {
                console.log("fdfs");
            
            await user.create({ name, email, phonenumber, password, address, favorites: []});
            user.find({ email: email }, function (err, docs) {
                jwt.sign(
                    { id: docs[0].id },
                    "secretKey",
                    { expiresIn: "1h" },
                    (err, token) => {
                        try {
                            console.log("token:", token)
                            res.status(201).json({ "message": "true", "token": token });

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
export const adduser = async (req, res) => {
    const { name, email, phonenumber, password, address, picture} = req.body;
    console.log("in sercver=",name, email, phonenumber, password, address);
    try {
        console.log("try");
        if (await user.findOne({ email: email }).exec()) {
            console.log("if")
            //res.status(201).json({ "message": "false" });
        }
        else {
            console.log("fsdfsd")
            const v = await user.create({ name, email, phonenumber, password, type: "company", status: "approved", picture, favorites: [], masterid: "null", limit: 0, access: "not requested" ,address });
            //console.log("comapny user= ", v)
            user.find({ email: email }, function (err, docs) {
                console.log("created!")
                try {
                    res.status(201).json({ "message": "true", "user": docs[0] });

                } catch (error) {
                    
                    res.status(404).json({ message: error.message });
                }


            })

        }


    }
    catch (error) {
        console.log("error=", error)
        res.status(409).json({ message: error.message });
    }
}
export const updateList = async (req, res) => {

    const { id: _id } = req.params;
    const userlist = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        console.log(req.body);
        const s = await user.findByIdAndUpdate(_id, { ...userlist, _id }, { new: true });
        console.log(s);
        const listings = await user.find({type: "property-dealer",access: "requested"});

        console.log(listings);
        res.json(listings);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email == "" && password == "") {
            res.status(201).json({ "message": "none" });

        } else if (await user.findOne({ email, password: password }).exec()) {
            user.find({ email: email, password: password }, function (err, docs) {
                jwt.sign(
                    { id: docs[0].id },
                    config.get('jwtSecretKey'),
                    { expiresIn: "1h" },
                    (err, token) => {
                        try {

                            res.status(201).json({ "message": true, "token": token, "user": docs[0] });

                        } catch (error) {
                            res.status(409).json({ message: error.message });
                        }
                    }
                )



            });

        }
        else {
            res.status(201).json({ "message": "false" });

        }

    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const favList = async (req, res) => {

    const { item, user_id } = req.body;
    //console.log("listid"+id);
    //console.log("user_id"+id);

    try {

        const userData = await user.findOne({ _id: user_id });
        const { _id, name, email, phonenumber, password, type, status, favorites, masterid, access, limit,message } = userData;
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
        const updated = await user.findByIdAndUpdate({ _id: user_id }, { _id, name, email, phonenumber, password, type, status, favorites, masterid, limit, access,message }, { new: true });
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
    const userdata = await user.findOne({ _id: user_id });

    const { _id, favorites, name, email, phonenumber, password, type, status, masterid, access, limit,message } = userdata;
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
        const updated = await user.findByIdAndUpdate(
            user_id, { _id, name, email, phonenumber, password, type, status, masterid, access, limit, favorites,message}, { new: true });

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

        const userData = await user.findOne({ _id: id }).exec();

        //console.log("userData" + userData);
        const { _id, name, email, phonenumber, password, type, Status, favorites,limit,access,message } = userData;
        //console.log("userData" + userData.favorites[0].title);
        console.log("destructuring");
        if (favorites.length === 0) {


            res.status(200).json({ 'message': false, favorites });

        }
        // let list = [];

        // for (let i = 0; i < favorites.length; i++) {

        //    // console.log("favorites" + i + favorites[i] );
        //     const index = favorites[i];
        //     const r = await listing.findOne({_id:index});
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

export const countSubusers = async (req, res) => {

    const id = req.body.user_id;
    try {

        const count = await user.countDocuments({ masterid: id });
        console.log(count);
        res.status(200).json({ count });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

}

export const findSubuserslist = async (req, res) => {
    console.log("subuserrrrr");
    const id = req.body.user_id;
    console.log("subuserID", id)

    try {

        const subusers = await user.find({ masterid: id });
        //console.log(subusers);
        let listings = [];
        // let l=[];
        // console.log("subuserslenggth"+subusers.length);
        for (let i = 0; i < subusers.length; i++) {
            const mail = subusers[i].email;
            //console.log("mail"+mail);
            const userlist = await listing.find({
                usermail: mail
            });
            if (userlist.length != 0) {
                listings = listings.concat(userlist);
            }

            //console.log("userlist"+userlist);

        }
        // console.log("listings"+listings);
        res.status(200).json({ listings });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getuserdetails = async (req, res) => {

    const id = req.body.user_id;
    try {

        const details = await user.findOne({ _id: id });
        res.status(200).json({ details });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const decreaselimit = async (req, res) => {
    const id = req.body.user_id;
    try {
        const userdata = await user.findOne({ _id: id });
        //console.log("initial limit" +userdata.limit);
        const limit = userdata.limit - 1;
        //console.log("initial limit" +limit);
        //const limit = limit1-1;
        userdata.limit = limit
        //console.log(" user" +userdata);
        //const newlimit = limit-1;
        //limit:newlimit;
        //limit-1;
        //const b = parseInt(newlimit);
        // b=b-1;
        //const {newlimit :limit};
        //console.log("decreased limit" +limit);
        const updated = await user.findByIdAndUpdate(id, {
            ...userdata,
            limit
        }, {
            new: true
        });
        //console.log("updated user" +updated);
        res.status(200).json({ updated });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export const updatelimit = async (req, res) => {

    const { id: _id } = req.params;
    const list = req.body;
    console.log(req.body);
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
        console.log(req.body);
        const s = await user.findByIdAndUpdate(_id, { ...list, _id }, { new: true });
        const listings = await user.find({ _id });


        res.json(listings);

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const deletesubuser = async (req, res) => {

    console.log(req.body);
    // const {id:_id}=req.params;
    const { _id } = req.body.item;
    const { email } = req.body.item;
    console.log(_id);
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
        await user.findOneAndDelete({ _id });
        await listing.findOneAndDelete({ usermail: email })
        const users = await user.find();
        res.json({ users });

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const fetchsubuser = async (req, res) => {
    const id = req.body.user_id;
    console.log(id);
    console.log("sdfsdf");
    try {


        const subusers = await user.find({ masterid: id });
        console.log(subusers);
        console.log("sdfsdf");
        res.json({ subusers });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {

    const { username, useremail, contact } = req.body;
    console.log(username, contact);
    try {
        const userdata = await user.findOne({ email: useremail });
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit,message } = userdata;
        const updated = await user.findByIdAndUpdate(_id, { _id, name: username, email, phonenumber: contact, password, type, status, masterid, access, limit,message }, {
            new: true
        });
console.log("updated= ", updated)



        res.status(200).json({ 'message': true });
    } catch (error) {
        console.log(error)
;    }

}

export const changePassword = async (req, res) => {

    const { newPassword, useremail } = req.body;
    console.log(newPassword);
    try {
        const userdata = await user.findOne({ email: useremail });
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit,message} = userdata;
        const updated = await user.findByIdAndUpdate(_id, { _id, name, email, phonenumber, password: newPassword, type, status, masterid, access, limit,message }, {
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
        await user.findOne({ email: email })
            .then(users => {
                if (!users) {
                    console.log("Error");
                    return res.status(200).json({ 'message': false, error: "User dont exists with that email" })
                }
                // user.resetToken = token
                // user.expireToken = Date.now() + 3600000
                // user.save().then((result)=>{

                var transporter = nodemailer.createTransport({
                    // service: 'gmail',//smtp.gmail.com  //in place of service use host...

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
                            { expiresIn: "1h" }
                        )

                        const expire = Date.now() + 3600000;
                        const { _id, firstName, lastName, email, password, resetToken, expires } = users;
                        const a = await user.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: token, expires: expire }, { new: true });

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

        let users = await user.findOne({ email: user_email, expires: { $gt: Date.now() } })

        if (!users) {
            return res.status(200).json({ "message": false, error: "Try again sesssion expired!" });
        } else {


            console.log("user= ", users.user_email);

            console.log("before:", users.password);


            // const salt = await bcrypt.genSalt(10);

            // const hashedPassword = await bcrypt.hash(pass, salt);
            const { _id, firstName, lastName, email, password, resetToken, expires } = users;
            console.log("expires= ", expires);
            const a = await user.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: pass, resetToken: null, expires: null }, { new: true });
            console.log("a= ", a.password);
            console.log("a= ", a.token);

            return res.status(200).json({ "message": true, success: "Password Chanegd!\n Sign in to Continue." });
        }


    } catch (error) {
        return res.status(200).json({ message: error.message });
    }


}

export const requestListing = async (req, res) =>{

    console.log("in req listing");
    const token = req.body.token;
    console.log("token",token);
    const user_id = jwt_decode(token);
    const id = user_id.id;
    console.log("userid",id);
    

    try{

        const userdata = await user.findOne({ _id:id });
        console.log("in req listing user data",userdata);
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit,message } = userdata;
        //userdata.access = "requested";
        const updated = await user.findByIdAndUpdate(_id, { _id, name, email, phonenumber, password, type, status, masterid, access:"requested", limit,message }, {
            new: true
        });

        console.log("updated request",updated);
        res.status(200).json({ 'message': true });


    } catch (error) {
        return res.status(200).json({ message: error.message });
    }

}

export const sendMessage = async (req, res) => {

    console.log(req.body);
    const{email:em,phonenumber:ph,msg:msg1} = req.body;
    
    try{

        const userdata = await user.findOne({ email:em });
        console.log("in msg userdata",userdata);
        const { _id, name, email, phonenumber, password, type, status, masterid, access, limit,message } = userdata;
        
        const updated = await user.findByIdAndUpdate(_id, { _id, name, email, phonenumber:ph, password, type, status, masterid, access, limit,message:msg1 }, {
            new: true
        });
        //console.log("in msg updated",updated);
        res.status(200).json({ 'message': true });


    }catch (error) {
        return res.status(200).json({ message: error.message });
    }
}