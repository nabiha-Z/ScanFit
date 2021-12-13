import initialState from '../../demoData/usersData.json';
import initialStateGroup from '../../demoData/usersGroupData.json';
import actions from './actions'

const userReducer = (state = initialState) => {
  return state;
};

const userGroupReducer = (state = initialStateGroup) => {
  return state;
};



const  userlistingsReducer= (state=[],action)=>{
  switch(action.type){
    case actions.FETCH_ALL:
      return action.payload;
    case actions.FETCH_UNAPPROVED:
      return action.payload;
    case actions.FETCH_PROPERTYDEALERS:
      return action.payload;
    case actions.UPDATE_ALL:
      return action.payload;
    case actions.ADD_USER:
      return action.payload;
    case actions.UPDATE_LIMIT:
      return action.payload;
      default:
        return state;
      }
    };
    
    export { userReducer, userGroupReducer };
    export default  userlistingsReducer;