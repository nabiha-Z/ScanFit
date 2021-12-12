import express from 'express';
import {getApprovedListings, getListings,getuserListings,getPendingListings,getRejectedListings,createListings,getApprovedRequested, approveListings,categorylist,rejectListings,searchListings,approveFeatured,getFeaturesListing,featureListings, deleteListing, similar,  recentListings} from '../controllers/listings.js';



const router = express.Router();

router.get('/',getListings);
router.post('/createlist',createListings);
router.post('/search',searchListings);
router.post('/getuserlistings',getuserListings);
router.get('/approved',getApprovedListings);
router.get('/pending',getPendingListings);
router.get('/recent', recentListings);
router.get('/rejected',getRejectedListings);
router.patch('/pending/:id',approveListings);
router.patch('/pending/reject/:id',rejectListings);
router.post('/categorylist',categorylist);
router.post('/similar',similar);
router.patch('/updatefeatures/:id',approveFeatured);
router.get('/getfeatures',getFeaturesListing);
router.post('/featurelist',featureListings);
router.get('/ApprovedRequested',getApprovedRequested);
router.patch('/deleteListing',deleteListing);

export default router;