import {LOAD_MYREQUESTS} from '../actions/requests';

const initialState = { 
    myrequests:[]
};


const myRequests = (state = initialState, action) => { 
    switch (action.type) {

        case LOAD_MYREQUESTS :
        state = {
            myrequests: action.obj.result
        };
        console.log(state);
        return state;

        default :
            return state;

    }
};
    
export default myRequests;