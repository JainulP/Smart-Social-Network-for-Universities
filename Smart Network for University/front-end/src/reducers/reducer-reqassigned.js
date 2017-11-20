import {LOAD_ASSIGNED} from '../actions/requests';

const initialState = { 
    assignedrequests:[]
};


const assignedRequests = (state = initialState, action) => { 
    switch (action.type) {

        case LOAD_ASSIGNED :
        state = {
            assignedrequests: action.obj.result
        };
        console.log(state);
        return state;

        default :
            return state;

    }
};
    
export default assignedRequests;