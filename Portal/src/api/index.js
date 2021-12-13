import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use(req => {
  if (Cookies.get('token')) {
    req.headers.authorization = `Bearer ${Cookies.get('token')}`;
  }

return req;
});

export const fetchadmin =()=> API.get(`admin/`);
export const fetchListings = () => API.get(`listings/`);
export const fetchuserlistings = () => API.get(`user/`);
export const fetchunapproved = () => API.get(`user/unapproved`);
export const fetchpropertydealers = () => API.get(`user/propertydealers`);
export const getApprovedRequested = () => API.get(`listings/ApprovedRequested`);
export const login = userdata => API.post(`admin/login`, userdata);
export const signup = userdata => API.post(`admin/signup`, userdata);
export const forgotPassword = userdata => API.post(`admin/forgotpassword`, userdata);
export const resetpassword = userdata => API.post(`admin/resetpassword`, userdata);
export const adduser = userdata => API.post(`user/adduser`, userdata);
// export const login = loginForm => API.post('admin/login', loginForm);
//export const signup =(userdata) => axios.post(`${url} /signup`,userdata)
export const fetchFeatures = userdata => API.get(`listings/getfeaures`, userdata);
export const approveFeatures = (id,data) => API.patch(`listings/updatefeatures/${id}`,data)
export const updatelimit = (id,data) => API.patch(`user/updatelimit/${id}`,data);

export const updateProfile = (data)=>API.patch(`admin/edit`,data)

export const updateList = (id, data) => API.patch(`user/approval/${id}`, data);
export const fetchPending = () => API.get(`listings/pending`);
export const fetchApproved = () => API.get(`listings/approved`);
export const fetchRejected = () => API.get(`listings/rejected`);
export const approveRequest = (id, listing) => API.patch(`listings/pending/${id}`, listing);
export const rejectRequest = (id, listing) => API.patch(`listings/pending/${id}`, listing);
export const createProject = (details) => API.post(`projects/createProject`,details);
export const getProfile = () => API.get('admin/user-profile');
