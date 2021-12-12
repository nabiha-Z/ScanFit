import axios from 'axios';
import Cookies from 'js-cookie';

// const API = axios.create({ baseURL: 'https://localhost:5000/' });
const API = axios.create({ baseURL: 'http://localhost:5000/' });

// API.interceptors.request.use(req => {
//   if (Cookies.get('token')) {
//     req.headers.authorization = `Bearer ${Cookies.get('token')}`;
//   }

// return req;
// });



// export const fetchunapproved = () => API.get(`user/unapproved`);
// export const fetchpropertydealers = () => API.get(`user/propertydealers`);
// export const getApprovedRequested = () => API.get(`listings/ApprovedRequested`);

export const fetchadmin =()=> API.get(`user/`);
export const fetchListings = () => API.get(`listings/`);
export const fetchLocations = () => API.get(`location/`);
export const fetchCategory = () => API.get(`categories/`);
export const recentLists = () => API.get(`listings/recent`);
export const projects = () => API.get(`projects`);
export const fetchuserlistings = userdata => API.post(`listings/getuserlistings`, userdata);
export const createListing = userdata => API.post(`listings/createlist`, userdata);
export const login = userdata => API.post(`user/login`, userdata);
export const searchLists = userdata => API.post(`listings/search`, userdata);
export const loginuser = userdata => API.post(`user/loginuser`, userdata);
export const signup = userdata => API.post(`user/signup`, userdata);
export const featureList = userdata => API.post(`listings/featurelist`, userdata);
export const categoryList = userdata => API.post(`listings/categorylist`, userdata);
export const addsubuser = userdata => API.post(`user/subusersdata`, userdata);
export const fetchsubuser = userdata => API.post(`user/fetchsubuser`, userdata);
export const deletesubuser = userdata => API.patch(`user/deletesubuser`, userdata);
export const subuserCount = userdata => API.post(`user/subusersCount`, userdata);
export const savedListings = userdata => API.post(`user/saved-lists`, userdata);
export const unsaveList = userdata => API.patch(`user/unfavlisting`, userdata);
export const deleteListing = userdata => API.patch(`listings/deleteListing`, userdata);
export const decLimit = userdata => API.patch(`user/dec-limit`, userdata);
export const favourite = userdata => API.patch(`user/favorite`, userdata);
export const updateProfile = (data)=>API.patch(`user/updateProfile`,data);
export const updatepassword = (data)=>API.patch(`user/changePassword`,data);
export const forgotPassword = userdata => API.post(`user/forgotpassword`, userdata);
export const resetPassword = userdata => API.post(`user/resetpassword`, userdata);
export const similarListings = userdata => API.post(`listings//similar`, userdata);
export const requestListing = userdata =>  API.patch(`user/requestlisting`, userdata);
export const messageSend = userdata => API.post(`user/send-message`, userdata);


// export const login = loginForm => API.post('user/login', loginForm);
//export const signup =(userdata) => axios.post(`${url} /signup`,userdata)
export const fetchFeatures = userdata => API.get(`listings/getfeaures`, userdata);
export const approveFeatures = (id,data) => API.patch(`listings/updatefeatures/${id}`,data)
export const updatelimit = (id,data) => API.patch(`user/updatelimit/${id}`,data);



//export const updateList = (id, data) => API.patch(`user/approval/${id}`, data);

