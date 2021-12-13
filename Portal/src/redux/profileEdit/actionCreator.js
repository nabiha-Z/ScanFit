import actions from './actions';
import * as api from '../../api';

export const Editprofile=(userdata)=> async(dispatch)=>{
    try{
        console.log(userdata);
        const {data} = await api.updateProfile(userdata);
        dispatch({type:actions.EDIT_ALL,payload:data})
    }catch(error){
        console.log(error.message);
    }

}