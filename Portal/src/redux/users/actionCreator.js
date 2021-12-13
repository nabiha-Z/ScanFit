import actions from './actions';
import * as api from '../../api';

export const Approveuser=(id,userdata)=> async(dispatch)=>{
    try{
        const {data} = await api.updateList(id,userdata);
        dispatch({type:actions.UPDATE_ALL,payload:data})
    }catch(error){
        console.log(error.message);
    }

}
export const fetchuserListings = () => async(dispatch) =>{
    try{
        const {data} = await api.fetchuserlistings();
        dispatch({type: actions.FETCH_ALL,payload:data})


    }
    catch(error){
        console.log(error.message);
    }
}
export const fetchunapproved = () => async(dispatch) =>{
    try{
    
        const {data} = await api.fetchunapproved();
        dispatch({type: actions.FETCH_UNAPPROVED,payload:data})


    }
    catch(error){
        console.log(error.message);
    }
}
export const adduser = (userdata) => async(dispatch) =>{
    try{
    
        const {data} = await api.adduser(userdata);
        dispatch({type: actions.ADD_USER,payload:data})


    }
    catch(error){
        console.log(error.message);
    }
}
export const fetchpropertydealers = () => async(dispatch) =>{
    try{
    
        const {data} = await api.fetchpropertydealers();
        dispatch({type: actions.FETCH_PROPERTYDEALERS,payload:data})


    }
    catch(error){
        console.log(error.message);
    }
}
export const updatelimit = (id,userdata) => async(dispatch) =>{
    try{
        
        const {data} = await api.updatelimit(id,userdata);
        console.log(id);
        dispatch({type: actions.UPDATE_LIMIT,payload:data})


    }
    catch(error){
        console.log(error.message);
    }
}
