import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:8000/' });

  export const login = admindata => API.post(`admin/login`, admindata);
  export const signup = admindata => API.post(`admin/signup`, admindata);
  export const forgotPassword = admindata => API.post(`admin/forgotpassword`, admindata);
  export const resetpassword = admindata => API.post(`admin/resetpassword`, admindata);
  export const updateProfile = (data)=>API.patch(`admin/edit`,data)
  export const getProfile = () => API.get('admin/admin-profile');
  export const addProducts = admindata => API.post(`admin/addproducts`, admindata);
  export const getProducts = admindata => API.get(`admin/getProducts`, admindata);
  export const deleteProduct = admindata => API.post(`admin/deleteProduct`, admindata);
  export const editProduct = admindata => API.post(`admin/editProduct`, admindata);
  export const getOrders = admindata => API.get(`admin/getOrders`, admindata);
