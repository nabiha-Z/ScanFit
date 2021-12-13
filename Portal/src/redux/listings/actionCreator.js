import actions from './actions';
import * as api from '../../api';


export const fetchListings = () => async(dispatch) =>{
    try{
        const {data} = await api.fetchListings();
        dispatch({type: actions.FETCH_ALL,payload:data})

    }
    catch(error){
        console.log(error.message);
    }
}

 export const fetchPending = () => async(dispatch) =>{
     try{
         const {data} = await api.fetchPending();
         dispatch({type: actions.FETCH_PENDING,payload:data})

     }
     catch(error){
        console.log(error.message);
    }
 }

 export const fetchApproved = () => async(dispatch) =>{
    try{
        const {data} = await api.fetchApproved();
        dispatch({type: actions.FETCH_APPROVED,payload:data})

    }
    catch(error){
       console.log(error.message);
   }
}

export const fetchRejected = () => async(dispatch) =>{
    try{
        const {data} = await api.fetchRejected();
        dispatch({type: actions.FETCH_REJECTED,payload:data})

    }
    catch(error){
       console.log(error.message);
   }
}

export const approveListings = (id, listing) => async(dispatch) => {
    try{
        const {data} = await api.approveRequest(id,listing);
        
        dispatch({type: actions.APPROVE_LISTING,payload:data})
    }
    catch(error){
        console.log(error.message);
    }
}

export const rejectListings = (id, listing) => async(dispatch) => {
    try{
        const {data} = await api.approveRequest(id,listing);
        
        dispatch({type: actions.REJECT_LISTING,payload:data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const approveFeatured = (id, listing) => async(dispatch) =>{
    try{
        const {data} = await api.approveFeatures(id,listing);
        dispatch({type: actions.APPROVE_FEATURES,payload:data})
    }
    catch(error){
        console.log(error.message);
    }

}
export const getApprovedRequested = () => async(dispatch) =>{
    try{
        const {data} = await api.getApprovedRequested();
        dispatch({type: actions.FETCH_APPROVED_REQUESTED,payload:data})
    }
    catch(error){
        console.log(error.message);
    }

}
