import actions from './actions'

const  listingsReducer= (state=[],action)=>{
    switch(action.type){
        case actions.FETCH_ALL:
            return action.payload;
        case actions.FETCH_PENDING:
            return action.payload;
        case actions.FETCH_APPROVED:
            return action.payload;
        case actions.FETCH_REJECTED:
            return action.payload;
        case actions.APPROVE_LISTING:
            return action.payload;
        case actions.REJECT_LISTING:
            return action.payload;
        case actions.APPROVE_FEATURES:
            return action.payload;
        case actions.FETCH_APPROVED_REQUESTED:
            return action.payload;
        default:
            return state;  
    }
};
export default  listingsReducer;