import actions from './actions'

const  project= (state=[],action)=>{

    switch(actions.type){

        case actions.CREATE_PROJECT:
            return action.payload

    }
}
export default project;