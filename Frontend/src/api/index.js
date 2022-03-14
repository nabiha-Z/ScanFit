import axios from 'axios';
import Cookies from 'js-cookie';

// const API = axios.create({ baseURL: 'https://localhost:5000/' });
const API = axios.create({ baseURL: 'http://localhost:8000/' });
const flaskAPI = axios.create({ baseURL: 'http://127.0.0.1:5000' });

API.interceptors.request.use(req => {
    if (Cookies.get('token')) {
      req.headers.authorization = `Bearer ${Cookies.get('token')}`;
    }
  
  return req;
  });

export const fetchadmin =()=> API.get(`user/`);
export const fetchProducts = () => API.get(`admin/getproducts`);
export const login = userdata => API.post(`user/login`, userdata);
export const searchLists = userdata => API.post(`listings/search`, userdata);
export const loginuser = userdata => API.post(`user/loginuser`, userdata);
export const signup = userdata => API.post(`user/signup`, userdata);
export const takeMeasurements = userdata => flaskAPI.post(`/`, userdata);
export const fetchMeasurements = userdata => API.post(`user/getMeassurements`, userdata)
export const editMeasurements = userdata => API.patch(`user/editMeasurements`, userdata)
export const deleteMeasurements = userdata => API.post(`user/deleteMeassurements`, userdata)
export const featureList = userdata => API.post(`listings/featurelist`, userdata);
export const searchCategory = userdata => API.post(`user/category-search`, userdata);
export const search = userdata => API.post(`user/search`, userdata);
export const filter = userdata => API.post(`user/filter`, userdata);
export const latestProducts = userdata => API.get(`user/latestProducts`, userdata);
export const fetchCart = userdata => API.post(`user/fetchCart`, userdata);
export const addCart = userdata => API.post(`user/addCart`, userdata);
export const deleteItem = userdata => API.post(`user/deleteCartItem`, userdata);
export const updateQuantity = userdata => API.post(`user/updateQuantity`, userdata);
export const getProduct = userdata => API.post(`user/getProduct`, userdata);
export const savedListings = userdata => API.post(`user/saved-lists`, userdata);
export const unsaveList = userdata => API.patch(`user/unfavlisting`, userdata);
export const deleteListing = userdata => API.patch(`listings/deleteListing`, userdata);
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

