import {LOAD_MEMBERS} from '../actions/user';

const initialState = { 
    members:[],
};


const members = (state = initialState, action) => { 
    switch (action.type) {

        case LOAD_MEMBERS :
        state = {
            members: action.obj.result,
        };
        console.log(state);
        return state;

        default :
            return state;

    }
};
    
export default members;