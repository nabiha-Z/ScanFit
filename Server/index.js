import cors from 'cors';

import userlist from './routes/users.js';
import listingRoutes from './routes/listings.js';
import admin from './routes/admin.js'
import categories from './routes/categories.js'
import location from './routes/location.js'
import projects from './routes/projects.js'


import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';



const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();



app.use('/listings',listingRoutes);
app.use('/user',userlist);
app.use('/admin',admin);
app.use('/categories',categories);
app.use('/location',location);
app.use('/projects',projects);

//const CONNECTION_URL = 'mongodb+srv://StrikingDash:strikingdash123@cluster0.oss3v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CONNECTION_URL = process.env.SECRETKEY;
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Connected Server running on Port:${PORT} `)))
    .catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);

