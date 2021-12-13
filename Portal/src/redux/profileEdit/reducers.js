import actions from './actions'

const  editProfileReducer = (state=[],action)=>{
    switch(action.type){
      case actions.EDIT_ALL:
        return action.payload;
        default:
          return state;
        }
      };
      

      export default  editProfileReducer;