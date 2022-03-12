import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import Admin from "../models/admin.js";
import dotenv from 'dotenv';

dotenv.config();
// const EMAIL = process.env.EMAIL;
// const host = process.env.HOST;


export const getadmin = async (req, res) => {
  try {
    const listings = await Admin.find();
    //console.log("dsfd"+listings);
    res.status(200).json(listings);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log("pass= ", password);

  try {
    const existingUser = await Admin.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({ message:true, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
 
  const { first, last, email, password } = req.body;
  console.log(first, last, email, password);


  try {
    console.log("before");
    if (await Admin.findOne({ email: email }).exec()) {
      console.log("after");
      return res.status(200).json({ "message": false, error: "User already exists." });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await Admin.create({
        firstName: first,
        lastName: last,
        email,
        password: hashedPassword,
        resetToken: null,
        expires: null
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET,
        { expiresIn: "6h" }
      );

      res.status(200).json({ "message": true, token, success: "Account Created." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};
export const updateProfile = async (req, res) => {

  const { email } = req.body;

  console.log(email);
  const data = req.body;
  try {
    const existingUser = await Admin.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    await Admin.findOneAndUpdate(email, data, {
      returnOriginal: false
    });

    const admindata = await Admin.find();

    console.log(admindata);
    res.json(admindata);

  } catch (error) {

    res.status(404).json({ message: error.message });
  }
};
export const getcurrentuser = async (req, res) => {
  const id = req.body.user_id;
  console.log(req.body);
  console.log(id);
  try {
      
      const listings = await Admin.find({_id:id});
      console.log(listings);
      res.status(200).json(listings);
  }
  catch (error) {
      res.status(404).json({ message: error.message });

  }
}

export const userProfile = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  try {
    const { firstName, lastName, email } = await Admin.findById(req.userId);

    res.status(200).json({ firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const forgotPassword = async (req, res) => {

  
  const { email } = req.body;
  // console.log("email rest pass= ", email);
  try {
    await Admin.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
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

        console.log("mail= ", user.email);



        var currentDateTime = new Date();
        var mailOptions = {
          from: 'no-reply@gmail.com',
          to: user.email,
          subject: "Reset password link",

          html: `<h1>You requested for password reset </h1><p>\
            If You are requested to reset your password then click on below link<br/>\
           <a href="http://localhost:3000/resetPassword/${user.email}">Click On This Link to reset</a><br/>\
           This link will expire within 1 hour.<br/>\
            </p>`
        };

        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("not sent: ", error);
          } else {

            const token = jwt.sign(
              { id: user._id },
              process.env.resetToken,
              { expiresIn: "1h" }
            )
           
            const expire = Date.now() + 3600000;
            const { _id, firstName, lastName, email, password, resetToken, expires } = user;
            const a = await Admin.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password, resetToken: token, expires: expire }, { new: true });
           
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
  const { pass, user_email } = req.body;
  try {
    
    let user = await Admin.findOne({ email: user_email, expires: { $gt: Date.now() } })
    
    if (!user) {
      return res.status(200).json({ "message": false, error: "Try again sesssion expired!" });
    } else {


      console.log("user= ", user.user_email);

      console.log("before:", user.password);
      

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(pass, salt);
      const { _id, firstName, lastName, email, password, resetToken, expires } = user;
      console.log("expires= ", expires);
      const a = await Admin.findByIdAndUpdate(_id, { _id, firstName, lastName, email, password: hashedPassword, resetToken: null, expires: null }, { new: true });
      console.log("a= ", a.password);
      console.log("a= ", a.token);

      return res.status(200).json({ "message": true, success: "Password Chanegd!\nReturn back to Sign in" });
    }


  } catch (error) {
    return res.status(200).json({ message: error.message });
  }


}
