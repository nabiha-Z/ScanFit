import actions from './actions';
import * as api from '../../api';

export const createProject = (details) => async(dispatch) =>{
    try {

        const {data} = await api.createProject(details);
        dispatch({type: actions.CREATE_PROJECT,payload:data});
        
    } catch (error) {
        console.log(error.message);
    }
}